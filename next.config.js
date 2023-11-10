/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  webpack: (config)=>{
    config.resolve.fallback = { fs: false};
    return config;
  }
}

module.exports = withImages();
module.exports = nextConfig