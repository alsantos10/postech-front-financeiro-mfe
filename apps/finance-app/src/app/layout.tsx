import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthGuard } from "@dash/dashboard-ui/AuthGuard";
import { DashboardProviders } from "@/ui/components/dashboard/DashboardProviders";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Sistema de controle financeiro desenvolvido para atividade de Postech",
};

interface Props {
    children: React.ReactNode;
  updateTransaction?: React.ReactNode;
}

export default function RootLayout({
    children,
    updateTransaction
}: Props) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <AuthGuard>
            <DashboardProviders children={children} updateTransaction={updateTransaction} />
            <DashboardFooter />
        </AuthGuard>
      </body>
    </html>
  );
}
