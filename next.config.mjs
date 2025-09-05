/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages serving from root directory
  // No basePath or assetPrefix needed for root deployment
};

export default nextConfig;