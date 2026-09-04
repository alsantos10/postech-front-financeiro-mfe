import { createUser, findUserByEmail } from "@/infra/api/JsonAuthService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {name, email, password} = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json({message: "Nome, e-mail e senha são obrigatórios"}, {status: 404});
        }
        
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({message: "E-mail já cadastrado"}, {status: 409});
        }
        
        const user = await createUser(name, email, password);
        return NextResponse.json(user, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Erro ao cadastrar usuário"}, {status: 500});
    }
}