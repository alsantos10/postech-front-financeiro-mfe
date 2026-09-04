import { AuthGuard } from "@dash/auth/context/AuthContext";
import { DashboardProviders } from "@/ui/components/dashboard/DashboardProviders";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";


export default function AdminLayout({
    children,
}: {children: React.ReactNode}) {
    return (
        <AuthGuard>
            <DashboardProviders children={children} updateTransaction={updateTransaction} />
            <DashboardFooter />
        </AuthGuard>
    );
}
