export function DashboardFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 bg-white py-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="ms-auto flex max-w-6xl items-center justify-between px-4">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    @ {currentYear} Painel de Controlador Demo
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                    Área Logada
                </span>
            </div>
        </footer>
    )
}