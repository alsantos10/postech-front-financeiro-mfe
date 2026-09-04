import { deleteSessionCookie } from "@/infra/cookies/CookieTokenStorage";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await deleteSessionCookie();
        return NextResponse.json({ message: "Logout realizado" });
    } catch(error) {
        return NextResponse.json({ message: "Erro ao realizar logout" }, { status: 500 });
    }
}