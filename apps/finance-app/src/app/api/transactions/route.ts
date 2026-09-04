import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";
const SESSION_COOKIE = "auth-session";

type JsonTransaction = {
  id: string;
  userId: string;
  type: string;
  amount: number;
  transactionDate: string;
  description: string;
};

type JsonUser = { id: string; email: string };

async function getSessionUser() {
  const sessionEmail = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!sessionEmail) return null;

  const response = await fetch(
    `${JSON_SERVER_URL}/users?email=${encodeURIComponent(sessionEmail)}`,
    { cache: "no-store" },
  );
  if (!response.ok) return null;

  const users = (await response.json()) as JsonUser[];
  return users[0] || null;
}

function toTransaction(transaction: JsonTransaction) {
  return {
    ...transaction,
    transactionDate: new Date(transaction.transactionDate),
  };
}

export async function GET(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(Number(searchParams.get("page") || 1), 1);
  const limit = Math.max(Number(searchParams.get("limit") || 10), 1);
  const sort = searchParams.get("sort") || "transactionDate";
  const order = searchParams.get("order") || "asc";
  const term = (searchParams.get("term") || "").trim().toLowerCase();

  const response = await fetch(
    `${JSON_SERVER_URL}/transactions?userId=${encodeURIComponent(user.id)}`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    return NextResponse.json({ message: "Erro ao listar transações" }, { status: 502 });
  }

  let transactions = (await response.json()) as JsonTransaction[];
  if (term) {
    transactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(term),
    );
  }

  transactions.sort((left, right) => {
    const leftValue = String(left[sort as keyof JsonTransaction] ?? "");
    const rightValue = String(right[sort as keyof JsonTransaction] ?? "");
    const comparison = leftValue.localeCompare(rightValue, undefined, { numeric: true });
    return order.toLowerCase() === "desc" ? -comparison : comparison;
  });

  const total = transactions.length;
  const start = (page - 1) * limit;
  const items = transactions.slice(start, start + limit).map(toTransaction);
  const balance = transactions.reduce(
    (totalAmount, transaction) =>
      transaction.type === "DEPOSITO"
        ? totalAmount + transaction.amount
        : totalAmount - transaction.amount,
    0,
  );

  return NextResponse.json({
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
    account: { type: "CONTA_CORRENTE", balance },
  });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { description, amount, type } = body;
  if (!description || typeof amount !== "number" || !type) {
    return NextResponse.json(
      { message: "Descrição, valor e tipo são obrigatórios" },
      { status: 400 },
    );
  }

  const response = await fetch(`${JSON_SERVER_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      description,
      amount,
      type,
      transactionDate: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Erro ao criar transação" }, { status: 502 });
  }

  return NextResponse.json(toTransaction(await response.json()), { status: 201 });
}
