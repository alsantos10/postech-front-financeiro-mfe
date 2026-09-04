"use client";

import { useRouter } from "next/navigation";
import { LoginModal } from "@/ui/components/public/LoginModal";

export default function LoginInterceptedPage() {
  const router = useRouter();

  return (
    <LoginModal
      onClose={() => router.back()}
      onOpenForgotPassword={() => router.push("/forgot-password")}
    />
  );
}
