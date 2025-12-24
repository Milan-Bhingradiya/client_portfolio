/** @type {import('next').NextConfig} */

import path from "path";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
};

export default nextConfig;
