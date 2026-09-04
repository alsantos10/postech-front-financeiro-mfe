import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/ui/context/AuthContext";
import { PublicShell } from "./PublicShell";

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

export default function RootLayout({
  children, auth, user, forgot
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
  user: React.ReactNode;
  forgot: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PublicShell>
          {children}
          {auth}
          {user}
          {forgot}
        </PublicShell>
      </body>
    </html>
  );
}
