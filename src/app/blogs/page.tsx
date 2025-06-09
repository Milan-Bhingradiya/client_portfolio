"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  content: string; // markdown
  imageUrl: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("  https://smit-shah-backend-80da1d71856d.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blogs.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <h1 className="text-5xl font-extrabold mb-20 text-center  drop-shadow-lg tracking-tight">
        Our Blogs
      </h1>
      {loading && (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      )}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blogs/${blog._id}`} className="group">
            <div className="bg-white/90 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow h-[370px] flex flex-col border border-gray-100 hover:border-purple-400 duration-200">
              <div className="relative w-full h-48 rounded-t-3xl overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 flex-1 line-clamp-3 text-base mb-2">
                  {blog.content.replace(/[#*_`>\-\[\]]/g, "").slice(0, 90)}...
                </p>
                <span className="mt-auto text-purple-600 font-semibold group-hover:underline group-hover:text-purple-800 transition">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
