"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@dash/auth/context/AuthContext";
import { PublicFooter } from "@/ui/components/public/PublicFooter";
import { PublicHeader } from "@/ui/components/public/PublicHeader";


export function PublicShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthProvider>
      <PublicHeader
        onOpenLogin={() => router.push("/login")}
        onOpenRegister={() => router.push("/register")}
      />
      {children}
      <PublicFooter />
    </AuthProvider>
  );
}
