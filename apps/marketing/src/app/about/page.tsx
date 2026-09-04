"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../_components/Skeleton";

const AboutContent = dynamic(() => import("../_components/AboutContent"), {
    loading: () => <Skeleton />,
    ssr: false,
});

export default function AboutPage() {
    return <AboutContent />;
}