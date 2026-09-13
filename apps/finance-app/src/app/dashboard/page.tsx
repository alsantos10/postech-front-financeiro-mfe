"use client";

import { useAuth } from "@dash/auth/context/AuthContext";
import { useCreateTransactionWithRedux } from "@/ui/hooks/useCreateTransactionWithRedux";
import { BalanceCard } from "@/ui/components/dashboard/BalanceCard";
import { NewTransactionCard } from "@/ui/components/dashboard/NewTransactionCard";

export default function DashboardPage() {

    const { user } = useAuth();
    const { createTransaction } = useCreateTransactionWithRedux();
    
    return (
        <div className="flex flex-1 flex-col sm:gap-2 w-full md:py-0">
            <BalanceCard userName={user?.name} />
            <NewTransactionCard onCreateTransaction={createTransaction} />
        </div>
    );
}