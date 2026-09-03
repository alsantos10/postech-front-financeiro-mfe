import { ReactNode } from "react";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

export async function AuthGuard({children}: {children: ReactNode}) {
    const cookieStorie = await cookies();
    const session = cookieStorie.get("auth-session")?.value;

    if (!session) {
        redirect("/");
    }

    return <>{children}</>;
}