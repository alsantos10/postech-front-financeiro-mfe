import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    output: 'standalone',
    outputFileTracingRoot: path.join(__dirname, '../../'),
    transpilePackages: ['@dash/core', '@dash/auth', '@dash/ui-kit', '@dash/dashboard-ui'],
    allowedDevOrigins: ["127.0.0.1", "localhost"],
    experimental: {
        serverActions: {
            allowedOrigins: (process.env.PUBLIC_APP_ORIGIN || "localhost:3000").split(","),
        }
    }
}

export default nextConfig;