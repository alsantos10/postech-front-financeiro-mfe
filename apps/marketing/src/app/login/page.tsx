"use client";

import { useRouter } from "next/navigation";
import { LoginModal } from "@/ui/components/public/LoginModal";

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginModal
      onClose={() => router.push("/")}
      onOpenForgotPassword={() => router.push("/forgot-password")}
    />
  );
}
