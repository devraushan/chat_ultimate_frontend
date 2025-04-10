
/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const nextConfig = {
  eslint: {

    ignoreDuringBuilds: true,
  },

  images: {
    domains:[
      process.env.NEXT_PUBLIC_BACKEND_DOMAIN
    ],
    unoptimized:true
  },
  reactStrictMode: true,
  swcMinify: true,
  
  webpack: (config)=>{
    config.resolve.fallback = { fs: false};
    return config;
  }
  
}



module.exports = withImages();
module.exports = nextConfig