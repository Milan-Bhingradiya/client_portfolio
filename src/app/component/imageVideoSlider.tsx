"use client";

import { Carousel } from "./ui/carousel";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
}

// Sample data with free online URLs
const sampleMedia: MediaItem[] = [
  { id: 1, type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" },
  { id: 2, type: "image", url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop" },
  { id: 3, type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 4, type: "image", url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop" },
  { id: 5, type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 6, type: "image", url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop" },
  { id: 7, type: "image", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop" },
  { id: 8, type: "image", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" },
];

export default function ImageVideoSlider() {
  return (
    <div className="relative overflow-hidden w-full h-full py-0 md:py-20 bg-black">
      {/* Beautiful Title Section */}
      <div className="relative z-30 text-center py-8 md:py-16 px-4">
        <div className="mb-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Highlights of Our Work
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
          Discover the magic of our creative journey through stunning visuals and captivating stories
        </p>
      </div>

      <Carousel mediaItems={sampleMedia} />
    </div>
  );
}
