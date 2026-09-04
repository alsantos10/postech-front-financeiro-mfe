import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const financeAppUrl = process.env.FINANCE_APP_URL || "http://localhost:3002";
const adminAppUrl = process.env.ADMIN_APP_URL || "http://localhost:3003";

const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(rootDir, "../../"),
  transpilePackages: ["@dash/core", "@dash/auth", "@dash/ui-kit"],
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async rewrites() {
    return {
      fallback: [
        {
          source: "/api/transactions",
          destination: `${financeAppUrl}/api/transactions`,
        },
        {
          source: "/api/transactions/:path*",
          destination: `${financeAppUrl}/api/transactions/:path*`,
        },
        {
          source: "/dashboard",
          destination: `${financeAppUrl}/dashboard`,
        },
        {
          source: "/dashboard/:path*",
          destination: `${financeAppUrl}/dashboard/:path*`,
        },
        {
          source: "/finance-static/:path*",
          destination: `${financeAppUrl}/finance-static/:path*`,
        },
        {
          source: "/admin",
          destination: `${adminAppUrl}/admin`,
        },
        {
          source: "/admin/:path*",
          destination: `${adminAppUrl}/admin/:path*`,
        },
        {
          source: "/admin-static/:path*",
          destination: `${adminAppUrl}/admin-static/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
