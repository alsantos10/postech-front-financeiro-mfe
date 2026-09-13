"use client";

import { BalanceCard } from "@/ui/components/dashboard/BalanceCard";
import { InvestmentsCard } from "@/ui/components/dashboard/InvestmentsCard";
import { useAuth } from "@dash/auth/context/AuthContext";


export default function InvestmentsPage() {
    const { user } = useAuth();
    
    return (
        <div className="flex flex-1 flex-col sm:gap-2 w-full md:py-0">
            <BalanceCard userName={user?.name} />
            <InvestmentsCard />
        </div>
    );
}