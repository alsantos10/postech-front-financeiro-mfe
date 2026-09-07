import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  INVESTMENT_OPTIONS,
  TRANSFERENCE_OPTIONS,
  TypeTransaction,
} from "@dash/core/entities/Transactions";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";
const SESSION_COOKIE = "auth-session";

function isValidSubtype(type?: string, subtype?: string) {
  if (type === undefined) return true;
  if (type === TypeTransaction.INVESTMENT) {
    return typeof subtype === "string" && INVESTMENT_OPTIONS.includes(subtype as typeof INVESTMENT_OPTIONS[number]);
  }
  if (type === TypeTransaction.TRANSFER) {
    return typeof subtype === "string" && TRANSFERENCE_OPTIONS.includes(subtype as typeof TRANSFERENCE_OPTIONS[number]);
  }
  return subtype === undefined;
}

async function getSessionUserId() {
  const email = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!email) return null;

  const response = await fetch(
    `${JSON_SERVER_URL}/users?email=${encodeURIComponent(email)}`,
    { cache: "no-store" },
  );
  if (!response.ok) return null;

  const users = (await response.json()) as Array<{ id: string }>;
  return users[0]?.id || null;
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ message: "Usuário não autenticado" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  if (!isValidSubtype(body.type, body.subtype)) {
    return NextResponse.json({ message: "Selecione um subtipo válido para a transação" }, { status: 400 });
  }
  const lookup = await fetch(`${JSON_SERVER_URL}/transactions/${encodeURIComponent(id)}`);
  if (!lookup.ok) {
    return NextResponse.json({ message: "Transação não encontrada" }, { status: 404 });
  }

  const transaction = await lookup.json();
  if (transaction.userId !== userId) {
    return NextResponse.json({ message: "Transação não encontrada" }, { status: 404 });
  }

  const response = await fetch(`${JSON_SERVER_URL}/transactions/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    return NextResponse.json({ message: "Erro ao atualizar transação" }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}
