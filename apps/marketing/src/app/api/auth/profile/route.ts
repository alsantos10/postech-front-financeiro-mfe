import { findUserByEmail, updateUserProfile } from "@/infra/api/JsonAuthService";
import { getSessionCookie } from "@/infra/cookies/CookieTokenStorage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const email = await getSessionCookie();
        if (!email) {
            return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
        }
        return NextResponse.json({ id: user.id, name: user.name, email: user.email });
    } catch(error) {
        return NextResponse.json({ message: "Erro ao buscar perfil" }, { status: 500 });    
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const email = await getSessionCookie();
        if (!email) {
            return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
        }

        const currentUser = await findUserByEmail(email);
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

        const updatedUser = await updateUserProfile(currentUser.id, updates);
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao atualizar perfil" }, { status: 500 });
    }
}