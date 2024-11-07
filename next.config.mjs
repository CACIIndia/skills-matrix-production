/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["randomuser.me","smempprofile.blob.core.windows.net"],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
