"use client";

import { ReactNode } from "react";
import store from "@/core/stores";
import { Provider } from "react-redux";
import { TransactionProvider } from "@/ui/context/TransactionContext";
import MainDashboard from "./MainDashboard";

interface DashboardProvidersProps {
    children: ReactNode;
    updateTransaction: ReactNode;
}

export function DashboardProviders({ children, updateTransaction }: DashboardProvidersProps) {
    return (
        <Provider store={store}>
            <TransactionProvider>
                <MainDashboard>
                    {children}
                    {updateTransaction}
                </MainDashboard>
            </TransactionProvider>
        </Provider>
    );
}
