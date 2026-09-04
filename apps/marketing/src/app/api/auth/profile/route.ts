import { findUserByEmail } from "@/infra/api/JsonAuthService";
import { getSessionCookie } from "@/infra/cookies/CookieTokenStorage"
import { NextResponse } from "next/server"

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