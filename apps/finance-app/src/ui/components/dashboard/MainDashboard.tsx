"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GetNavigationLinksUseCase } from "@dash/core/usecases/GetNavigationLinksUseCase";
import { SidebarTransactions } from "./SidebarTransactions";
import { UserMenu } from "@dash/dashboard-ui/UserMenu";

export default function MainDashboard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const links = new GetNavigationLinksUseCase().execute();

    return (
        <div className="flex min-h-screen flex-col bg-[#E4EDE3]">
            <header className="flex h-16 items-center justify-end bg-[#004D61] px-4">
                <UserMenu />
            </header>
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col xl:flex-row">
                <aside className="hidden w-45 shrink-0 py-6 xl:block">
                    <nav className="flex flex-col gap-2 rounded-lg bg-white p-4">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href} className={pathname === link.href ? "font-semibold text-[#47A138]" : "text-zinc-700"}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </aside>
                <main className="min-w-0 flex-1 p-4">{children}</main>
                <aside className="w-full shrink-0 p-4 xl:w-[282px]"><SidebarTransactions /></aside>
            </div>
        </div>
    );
}
