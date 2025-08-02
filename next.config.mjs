/** @type {import('next').NextConfig} */

import path from "path";
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "imgs.search.brave.com",
      "images.unsplash.com",
      "firebasestorage.googleapis.com",
      "res.cloudinary.com"
    ],
  },

  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
};

export default nextConfig;
