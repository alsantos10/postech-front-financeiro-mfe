"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "../_components/Skeleton";

const ProductsContent = dynamic(() => import("../_components/ProductsContent"), {
    loading: () => <Skeleton />,
    ssr: false,
});

export default function ProductsPage() {
    return <ProductsContent />;
}