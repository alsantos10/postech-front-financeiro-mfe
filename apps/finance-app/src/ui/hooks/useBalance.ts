"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/core/stores";

export function useBalance() {
    const { account, items, loading } = useSelector((state: RootState) => state.transactions);
    const balance = account?.balance ?? items.reduce((total, transaction) => {
        return transaction.type === "DEPOSITO" ? total + transaction.amount : total - transaction.amount;
    }, 0);

    return { balance, loading };
}
