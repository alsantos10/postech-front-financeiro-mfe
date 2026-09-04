import { LayoutDashboard, LayoutFreeformIcon, LayoutList, Settings, User, Users } from "lucide-react";
import Link from "next/link";

const links = [
    {href: "/dashboard", label: "Painel", icon: LayoutDashboard},
    {href: "/dashboard/users", label: "Usuários", icon: Users},
    {href: "/dashboard/profile", label: "Perfil", icon: User},
    {href: "/dashboard/settings", label: "Configurações", icon: Settings},
];

export function FeatureNav() {
    return (
        <nav className="flex flex-col gap-1 p-4">
            {links.map((link) => (
                <Link   
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-dm font-medium text-zinc-700 hover:bg-zinc-100">
                        <link.icon size={18} />
                        {link.label}
                    </Link>
            ))}
        </nav>
    )
}