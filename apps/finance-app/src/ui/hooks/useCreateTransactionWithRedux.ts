"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/core/stores";
import { createTransactionAsync } from "@/core/features/transactions/transactionSlice";
import { TypeTransaction } from "@/core/entities/Transactions";
import { useAuth } from "./useAuth";
import { useCallback } from "react";

/**
 * Hook que integra a criação de transação com Redux
 * Automaticamente recarrega a lista de transações após criar uma nova
 */
export function useCreateTransactionWithRedux() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth();
    const { page, limit } = useSelector((state: RootState) => state.transactions);

    const createTransaction = useCallback(
        async (description: string, amount: number, type: TypeTransaction) => {
            if (!user) {
                throw new Error("Usuário não autenticado");
            }

            await dispatch(createTransactionAsync({
                user,
                description,
                amount,
                type,
                page,
                limit
            }));
        },
        [dispatch, user, page, limit]
    );

    return { createTransaction };
}
