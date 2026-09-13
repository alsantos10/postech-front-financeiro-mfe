import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

const links = [
    { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
    { href: "/admin/profile", label: "Perfil", icon: User },
];

export function FeatureNav() {
    return (
        <nav className="flex flex-col gap-1 p-4">
            {links.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-dm font-medium text-zinc-700 hover:bg-zinc-100">
                    <link.icon size={18} />
                    {link.label}
                </a>
            ))}
        </nav>
    )
}