/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "canvas"]; //need canvas for pdfjs
    return config;
  },
};

module.exports = nextConfig;
