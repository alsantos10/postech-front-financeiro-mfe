import { findUserByEmail, updatePassword } from "@/infra/api/JsonAuthService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "E-mail, senha são obrigatórios"}, {status: 400})
        }
        const user = await findUserByEmail(email);
        if (!user) {
            return NextResponse.json({ message: "Usuário não foi encontrado"}, {status: 404})
        }
        
        const userUpdated = updatePassword(user, password);
        if (!userUpdated) {
            return NextResponse.json({ message: "Erro ao alterar senha"}, {status: 409})
        }

        return NextResponse.json(userUpdated, {status: 201});
    } catch(error) {
        return NextResponse.json({ message: "Erro ao recuperar senha"}, {status: 500})
    }
}