import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";
const SESSION_COOKIE = "auth-session";

type JsonUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get(SESSION_COOKIE)?.value;

    if (!email) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const response = await fetch(`${JSON_SERVER_URL}/users?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      return NextResponse.json({ message: "Erro ao consultar perfil" }, { status: 500 });
    }

    const users: JsonUser[] = await response.json();
    const user = users[0];

    if (!user) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch {
    return NextResponse.json({ message: "Erro ao buscar perfil" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get(SESSION_COOKIE)?.value;

    if (!email) {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    const meResponse = await fetch(`${JSON_SERVER_URL}/users?email=${encodeURIComponent(email)}`);
    if (!meResponse.ok) {
      return NextResponse.json({ message: "Erro ao localizar usuário" }, { status: 500 });
    }

    const users: JsonUser[] = await meResponse.json();
    const currentUser = users[0];

    if (!currentUser) {
      return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }

    const body = await request.json();
    const updates: { name?: string; password?: string } = {};

    if (typeof body.name === "string" && body.name.trim().length >= 2) {
      updates.name = body.name.trim();
    }

    if (typeof body.password === "string" && body.password.trim().length >= 6) {
      updates.password = body.password.trim();
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "Nenhum dado válido para atualizar" }, { status: 400 });
    }

    const updateResponse = await fetch(`${JSON_SERVER_URL}/users/${currentUser.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!updateResponse.ok) {
      return NextResponse.json({ message: "Erro ao atualizar perfil" }, { status: 500 });
    }

    const updatedUser: JsonUser = await updateResponse.json();
    return NextResponse.json({ id: updatedUser.id, name: updatedUser.name, email: updatedUser.email });
  } catch {
    return NextResponse.json({ message: "Erro ao atualizar perfil" }, { status: 500 });
  }
}
