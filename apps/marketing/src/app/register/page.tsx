"use client";

import { useRouter } from "next/navigation";
import { RegisterModal } from "@/ui/components/public/RegisterModal";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <RegisterModal
      onClose={() => router.push("/")}
      onOpenLogin={() => router.push("/login")}
    />
  );
}
