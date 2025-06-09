"use client";
import Image from "next/image";
import Link from "next/link";

// Dummy blog data (replace with API or DB fetch as needed)
const blogs = [
  {
    id: "1",
    title: "How to Build a Brand in 2025",
    summary: "A step-by-step guide to building a memorable brand in the digital age.",
    image: "/branding.png",
  },
  {
    id: "2",
    title: "Marketing Automation Trends",
    summary: "Discover the latest in marketing automation and how to leverage it for growth.",
    image: "/devlopment.png",
  },
  {
    id: "3",
    title: "UI/UX Best Practices",
    summary: "Top UI/UX tips for creating engaging digital experiences.",
    image: "/UIUX.png",
  },
];

export default function BlogsPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Our Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} className="group">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow h-full flex flex-col">
              <div className="relative w-full h-56">
                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">{blog.title}</h2>
                <p className="text-gray-600 flex-1">{blog.summary}</p>
                <span className="mt-4 text-purple-600 font-semibold">Read More →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
