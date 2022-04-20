/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  standalone: true,
  env: {
    CHAIN_ID: process.env.CHAIN_ID,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
