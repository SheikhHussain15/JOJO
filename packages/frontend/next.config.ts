import type { NextConfig } from "next";

// Frontend talks to the API over same-origin /api/*. In local dev the backend
// lives in packages/backend (default :4000) — proxy /api/* there so the
// browser never needs to know. In production, deploy the backend anywhere and
// point NEXT_PUBLIC_API_URL at it (or put a reverse proxy in front of /api).
const backendOrigin = process.env.BACKEND_ORIGIN ?? "http://127.0.0.1:4000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
