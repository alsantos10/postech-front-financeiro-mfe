import { DashboardProviders } from "@/ui/components/DashboardProviders";
import { AuthProvider } from "@dash/auth/context/AuthContext";
import { AuthGuard } from "@dash/dashboard-ui/AuthGuard";
import { DashboardFooter } from "@dash/dashboard-ui/DashboardFooter";

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({
    children
}: Props) {
    return (
        <AuthGuard>
            <AuthProvider>
                <DashboardProviders children={children} />
                <DashboardFooter />
            </AuthProvider>
        </AuthGuard>
    );
}
