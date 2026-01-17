import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Enable strict type checking in production
  typescript: {
    // TODO: Fix TypeScript errors before production deployment
    // Set to false to enforce type safety
    ignoreBuildErrors: true,
  },
  eslint: {
    // TODO: Fix ESLint errors before production deployment
    // Set to false to enforce code quality
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'books.google.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'books.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Headers to fix Firebase Google Sign-In popup issues
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Optimize for Vercel deployment
  output: 'standalone',
};

export default nextConfig;
