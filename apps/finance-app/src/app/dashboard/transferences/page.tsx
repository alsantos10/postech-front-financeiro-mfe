"use client";

import { BalanceCard } from "@/ui/components/dashboard/BalanceCard";
import { TransferencesCard } from "@/ui/components/dashboard/TransferencesCard";
import { useAuth } from "@dash/auth/context/AuthContext";

export default function TransferencesPage() {
    const { user } = useAuth();

    return (
        <div className="flex flex-row sm:flex-col sm:gap-2">
            <BalanceCard userName={user?.name} />
            <TransferencesCard />
        </div>
    )
}