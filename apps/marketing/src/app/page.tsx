"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "./_components/Skeleton";

const HomeContent = dynamic(() => import("./_components/HomeContent"), {
    loading: () => <Skeleton />,
    ssr: false,
});

export default function HomePage() {
    return <HomeContent />;
}