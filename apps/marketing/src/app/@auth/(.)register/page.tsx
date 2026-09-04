"use client";

import { useRouter } from "next/navigation";
import { RegisterModal } from "@/ui/components/public/RegisterModal";

export default function RegisterInterceptedPage() {
  const router = useRouter();

  return (
    <RegisterModal
      onClose={() => router.back()}
      onOpenLogin={() => router.push("/login")}
    />
  );
}
