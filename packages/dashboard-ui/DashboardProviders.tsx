"use client";

import { ReactNode } from "react";
import store from "@/core/stores";
import { Provider } from "react-redux";
import { TransactionProvider } from "@/ui/context/TransactionContext";
import MainDashboard from "./MainDashboard";
import { BrowserRouter } from "react-router-dom";

interface DashboardProvidersProps {
    children: ReactNode;
    updateTransaction: ReactNode;
}

export function DashboardProviders({ children, updateTransaction }: DashboardProvidersProps) {
    return (
        <Provider store={store}>
            <TransactionProvider>
                <BrowserRouter>
                    <MainDashboard>
                        {children}
                        {updateTransaction}
                    </MainDashboard>
                </BrowserRouter>
            </TransactionProvider>
        </Provider>
    );
}
