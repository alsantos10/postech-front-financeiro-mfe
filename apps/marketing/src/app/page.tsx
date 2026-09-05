"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@dash/auth/context/AuthContext";
import { Skeleton } from "./_components/Skeleton";

const HomeContent = dynamic(() => import("./_components/HomeContent"), {
    loading: () => <Skeleton />,
    ssr: false,
});

export default function HomePage() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, loading, router]);

    if (loading || isAuthenticated) {
        return <Skeleton />;
    }

    return <HomeContent />;
}