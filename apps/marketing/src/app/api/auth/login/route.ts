import { findUserByEmail, validationPassword } from "@/infra/api/JsonAuthService";
import { setSessionCookie } from "@/infra/cookies/CookieTokenStorage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const {email, password} = await request.json();

        if (!email || !password) {
            return NextResponse.json({
                message: 'E-mail e senha são obrigatórios'
            }, {status: 400});
        }
        
        const user =  await findUserByEmail(email);
        if (!user || !validationPassword(password, user.password)) {
            return NextResponse.json({
                message: 'Credenciais inválidas'
            }, {status: 401});
        }

        await setSessionCookie(user.email);

        return NextResponse.json({
            user: {id: user.id, name: user.name, email: user.email}
        });
    } catch(err) {
        return NextResponse.json({
            message: "Erro ao realizar login"
        }, {status: 500});

    }
}