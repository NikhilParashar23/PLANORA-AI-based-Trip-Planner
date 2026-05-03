/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows the build to finish even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;