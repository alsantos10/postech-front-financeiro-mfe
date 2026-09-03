import type { NextConfig } from 'next';
import path from 'path';

const FINANCE_APP_URL = process.env.FINANCE_APP_URL || 'http://localhost:3002';
const ADMIN_APP_URL = process.env.ADMIN_APP_URL || 'http://localhost:3003';

const nextConfig: NextConfig = {
    output: 'standalone',
    outputFileTracingRoot: path.join(__dirname, '../../'),
    transpilePackages: ['@dash/core', '@dash/auth', '@dash/ui-kit'],
    allowedDevOrigins: ["127.0.0.1", "localhost"],
    async rewrites() {
        return [
            //Zona finance-app: home fianceira, transacoes, perfil e configuracoes
            {
                source: "/dashboard",
                destination: `${FINANCE_APP_URL}/dashboard`
            },
            {
                source: '/dashboard/:path*',
                destination: `${FINANCE_APP_URL}/dashboard/:path*`,
            },
            {
                source: '/finance-static/:path*',
                destination: `${FINANCE_APP_URL}/finance-static/:path*`,
            },
            //Zona Admin usuarios
            {
                source: '/admin',
                destination: `${ADMIN_APP_URL}/admin`,
            },
            {
                source: '/admin/:path*',
                destination: `${ADMIN_APP_URL}/admin/:path*`
            },
            {
                source: '/admin-static/:path*',
                destination: `${ADMIN_APP_URL}/admin-static/:path*`
            }
        ];
    }
}