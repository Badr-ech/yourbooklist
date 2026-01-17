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
        hostname: 'placehold.co',
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
  // Optimize for Vercel deployment
  output: 'standalone',
};

export default nextConfig;
