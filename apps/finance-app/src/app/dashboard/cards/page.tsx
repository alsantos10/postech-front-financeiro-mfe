"use client";

import { BalanceCard } from "@/ui/components/dashboard/BalanceCard";
import { CardItem, MyCardsCard } from "@/ui/components/dashboard/MyCardsCard";
import { useAuth } from "@dash/auth/context/AuthContext";

export default function CardsPage() {
    const { user } = useAuth();

    const cards: CardItem[] = [
        {
            id: "physical",
            title: "Byte Platinum",
            owner: user?.name ?? '',
            lastFourDigits: "••••••••",
            type: "physical",
            status: "active",
            color: "linear-gradient(135deg, rgba(0,77,97,0.95), rgba(0,118,139,0.8))",
        },
        {
            id: "digital",
            title: "Byte Platinum",
            owner: user?.name ?? '',
            lastFourDigits: "••••••••",
            type: "digital",
            status: "active",
            color: "linear-gradient(135deg, rgba(170,170,170,0.95), rgba(124,124,124,0.8))",
        },
    ];

    return (
        <div className="flex flex-1 flex-col sm:gap-2 w-full md:py-0">
            <BalanceCard userName={user?.name} />
            <MyCardsCard cards={cards} />
        </div>
    )
}