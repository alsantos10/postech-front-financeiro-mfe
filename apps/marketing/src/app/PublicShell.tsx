"use client";

import ReactNode from "react";
import { AuthProvider } from "@dash/auth/context/AuthContext";

export function PublicShell({ children }: { children: ReactNode }) {
    return (
        <body className="min-h-full flex flex-col">
            <AuthProvider>
                {children}
            </AuthProvider>
        </body>
    );
}
