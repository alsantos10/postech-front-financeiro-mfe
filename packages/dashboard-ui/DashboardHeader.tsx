"use client"

import Link from "next/link";
import { useState } from "react";
import { UserMenu } from "./UserMenu";
import { Menu, X } from "lucide-react";
import { FeatureNav } from "./FeatureNav";

export function DashboardHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="border-b border-zinc-200 bg-[#004D61]">
            <div className="mx-auto flex max-w-6xl items-center justify-end px-4 py-4">
                <div className="flex items-center gap-4">
                    <UserMenu />
                    <button className="md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Menu">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-zinc-200 md:hidden">
                    <FeatureNav />
                </div>
            )}
        </header>
    )
}