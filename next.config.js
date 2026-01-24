/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
    // basePath: '/M-MlandLCC', // Commented out for custom domain support,
  webpack: (config, { isServer }) => {
    // Don't bundle Node.js modules for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
