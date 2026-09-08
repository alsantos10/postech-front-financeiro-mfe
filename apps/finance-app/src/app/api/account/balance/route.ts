import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";
const SESSION_COOKIE = "auth-session";

export async function GET() {
  const sessionEmail = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!sessionEmail) {
    return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
  }

  const userResponse = await fetch(
    `${JSON_SERVER_URL}/users?email=${encodeURIComponent(sessionEmail)}`,
    { cache: "no-store" },
  );
  if (!userResponse.ok) {
    return NextResponse.json({ message: "Erro ao buscar usuário" }, { status: 502 });
  }

  const users = (await userResponse.json()) as Array<{ id: string }>;
  const user = users[0];
  if (!user) {
    return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
  }

  const transactionsResponse = await fetch(
    `${JSON_SERVER_URL}/transactions?userId=${encodeURIComponent(user.id)}`,
    { cache: "no-store" },
  );
  if (!transactionsResponse.ok) {
    return NextResponse.json({ message: "Erro ao buscar saldo" }, { status: 502 });
  }

  const transactions = (await transactionsResponse.json()) as Array<{
    type: string;
    amount: number;
  }>;
  const balance = transactions.reduce(
    (total, transaction) =>
      transaction.type === "DEPOSITO"
        ? total + transaction.amount
        : total - transaction.amount,
    0,
  );

  return NextResponse.json({ balance });
}