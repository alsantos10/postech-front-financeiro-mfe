"use client";

import { formatCurrency } from "@/shared/formatting/currency";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useBalance } from "@/ui/hooks/useBalance";
import { useAuth } from "@/ui/hooks/useAuth";

interface BalanceCardProps {
    userName?: string;
}

function getFormattedToday() {
    const formatted = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(new Date());

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function BalanceCard({ userName: userNameProp }: BalanceCardProps) {
    const [balanceVisible, setBalanceVisible] = useState(true);
    const { user } = useAuth();
    const { balance, loading } = useBalance();

    const displayName = userNameProp || user?.name || 'Usuário';

    return (
        <div
            className="grid grid-cols-2 relative min-h-100 overflow-hidden rounded-2xl bg-[#004D61] bg-no-repeat p-6 text-white"
            style={{
                backgroundImage: "url('/IlustraFundoMain/IlustraFundoMain3.svg'), url('/IlustraFundoMain/IlustraFundoMain1.svg'), url('/IlustraFundoMain/IlustraFundoMain2.svg')",
                backgroundPosition: "right top, 2em bottom, left bottom",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="relative z-10">
                <div>
                    <p className="text-lg font-semibold">Olá, {displayName}!</p>
                    <p className="mt-6 text-sm">{getFormattedToday()}</p>
                </div>
            </div>

            <div className="relative z-10 mt-18">
                <div className="flex items-center justify-start gap-4">
                    <p className="text-xl font-semibold rounded-b-2xl">Saldo
                    </p>
                    <button
                        type="button"
                        onClick={() => setBalanceVisible((prev) => !prev)}
                        className="flex shrink-0 items-center gap-1 text-sm cursor-pointer"
                        aria-label={balanceVisible ? "Ocultar saldo" : "Mostrar saldo"}
                    >
                        {balanceVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                </div>
                <hr className="h-[2] border-none bg-white mt-2" />

                <p className="mt-6 text-md">Conta Corrente</p>
                <p className="mt-1 text-3xl font-semibold">
                    {loading ? "..." : balanceVisible ? formatCurrency(balance) : "R$ ******"}
                </p>
            </div>
        </div>
    );
}