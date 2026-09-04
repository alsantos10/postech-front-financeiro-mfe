import { AuthGuard } from "@dash/dashboard-ui/AuthGuard";
import { DashboardFooter } from "@dash/dashboard-ui/DashboardFooter";


export default function AdminLayout({
    children,
}: {children: React.ReactNode}) {
    return (
        <AuthGuard>
            {children}
            <DashboardFooter />
        </AuthGuard>
    );
}
