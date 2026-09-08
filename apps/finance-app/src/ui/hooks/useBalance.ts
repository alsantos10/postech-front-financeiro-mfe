"use client";

import { useCallback, useEffect, useState } from "react";

export function useBalance() {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadBalance = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch("/api/account/balance", { cache: "no-store" });
            if (!response.ok) throw new Error("Erro ao carregar saldo");

            const data: { balance: number } = await response.json();
            setBalance(data.balance);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadBalance().catch(() => setBalance(0));

        function handleBalanceUpdated() {
            loadBalance().catch(() => setBalance(0));
        }

        window.addEventListener("balance-updated", handleBalanceUpdated);
        return () => window.removeEventListener("balance-updated", handleBalanceUpdated);
    }, [loadBalance]);

    return { balance, loading };
}
