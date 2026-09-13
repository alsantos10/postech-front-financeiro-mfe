"use client";

import { ReactNode } from "react";
import MainAdmin from "@dash/dashboard-ui/MainAdmin";

interface DashboardProvidersProps {
    children: ReactNode;
}

export function DashboardProviders({ children }: DashboardProvidersProps) {
    return (
        <MainAdmin>
            {children}
        </MainAdmin>
    );
}
