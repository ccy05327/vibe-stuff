/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
