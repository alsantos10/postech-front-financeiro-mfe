"use client"

import { useAuth } from "@/ui/context/AuthContext";
import { User, UserCircle, UserCircle2, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export function UserMenu() {
    const {user, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    async function handleLogout() {
        await logout();
        window.location.href = "/";
    }

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-2 bg-transparent"
                aria-label="Menu do Usuário">
                    <span className="hidden text-sm font-medium text-white md:block">
                        {user?.name || "Usuário"}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center cursor-pointer rounded-full text-orange-500 border-2 border-orange">
                        <User size={18}/>
                    </div>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-sm border border-zinc-200 bg-white shadow-lg">
                    <Link
                        href="/painel/profile"
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                        onClick={() => setIsOpen(false)}>
                            Perfil
                    </Link>
                    <Link
                        href="/painel/profile"
                        className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                        onClick={() => setIsOpen(false)}>
                            Configurações
                    </Link>
                    <Link
                        href="/"
                        className="block px-4 py-2 text-left text-sm text-red-600 hover:bg-zinc-100"
                        onClick={handleLogout}>
                            sair
                    </Link>

                </div>
            )}
        </div>
    )
}