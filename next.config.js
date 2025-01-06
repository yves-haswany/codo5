/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // This must be an object, not a boolean.
  },
};

module.exports = nextConfig;
