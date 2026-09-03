"use client";

import { TypeTransaction } from "@/core/entities/Transactions";
import { User } from "@/core/entities/User";
import { UserTransaction } from "@/core/entities/UserTransactions";
import { NextAuthRepository } from "@/infra/repositories/NextAuthRepository";
import { NextTransactionRepository } from "@/infra/repositories/NextTransactionRepository";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface TransactionContextData {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    createTransaction: (description: string, amount: number, type: TypeTransaction) => Promise<void>;
    updateTransaction: (id: string, description: string, amount: number, type: TypeTransaction) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData | undefined>(undefined);
const authRepository = new NextAuthRepository();
const transactionRepository = new NextTransactionRepository();

export function TransactionProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User|null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authRepository
            .getProfile()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    },[]);

    const createTransaction = useCallback(async (description: string, amount: number, type: TypeTransaction) => {
        const userLogged = await authRepository.getProfile();
        const transaction: UserTransaction = new UserTransaction(userLogged as User);
        transaction.description = description;
        transaction.amount = amount;
        transaction.type = type;
        await transactionRepository.createTransactionForUser(transaction);
    }, []);

     const updateTransaction = useCallback(async (transactionId: string, description: string, amount: number, type: TypeTransaction) => {
        await transactionRepository.updateTransactionForUser(transactionId, { description, amount, type });
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                user, 
                isAuthenticated: !!user,
                loading,
                createTransaction,
                updateTransaction
            }}>
            {children}
        </TransactionContext.Provider>
    )
}

export function useTransaction() {
    const context = useContext(TransactionContext);
    if(!context) {
        throw new Error("useTransaction deve ser usado dentro do TransactionProvider");
    }
    return context;
}