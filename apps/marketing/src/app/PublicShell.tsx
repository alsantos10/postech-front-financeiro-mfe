"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@dash/auth/context/AuthContext";

export function PublicShell({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>{children}</AuthProvider>
    );
}
