/** @type {import('next').NextConfig} */

import path from "path";
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "imgs.search.brave.com",
      "images.unsplash.com",
      "firebasestorage.googleapis.com",
    ],
  },
  backgroundImage: {
    "custom-gradient":
      "linear-gradient(-25deg, rgba(0, 0, 0, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)",
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
};

export default nextConfig;
