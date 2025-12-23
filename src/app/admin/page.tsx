"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProjects,
  fetchBlogs,
  fetchMessages,
  fetchHighlights,
} from "@/lib/api";

export default function AdminDashboard() {
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
  const { data: highlights = [] } = useQuery({
    queryKey: ["highlights"],
    queryFn: fetchHighlights,
  });

  const loading = !projects && !blogs && !messages;

  const cards = [
    {
      label: "Highlights",
      count: highlights.length,
      href: "/admin/highlights",
      color: "bg-amber-600",
    },
    {
      label: "Projects",
      count: projects.length,
      href: "/admin/projects",
      color: "bg-blue-600",
    },
    {
      label: "Blogs",
      count: blogs.length,
      href: "/admin/blogs",
      color: "bg-emerald-600",
    },
    {
      label: "Messages",
      count: messages.length,
      href: "/admin/messages",
      color: "bg-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {loading ? (
        <div className="text-zinc-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className={`${card.color} rounded-xl p-6 hover:scale-105 transition-transform`}
            >
              <h2 className="text-lg text-white/80 font-medium">
                {card.label}
              </h2>
              <p className="text-4xl font-bold text-white mt-2">{card.count}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/highlights/add"
          className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-amber-500 transition-colors"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            ✨ Add Highlight
          </h3>
          <p className="text-zinc-400">
            Add a new slide to the homepage slider
          </p>
        </Link>

        <Link
          href="/admin/projects/add"
          className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-amber-500 transition-colors"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            Add New Project
          </h3>
          <p className="text-zinc-400">
            Create a new portfolio project with images
          </p>
        </Link>

        <Link
          href="/admin/blogs/add"
          className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-amber-500 transition-colors"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            Add New Blog
          </h3>
          <p className="text-zinc-400">Write and publish a new blog post</p>
        </Link>
      </div>
    </div>
  );
}
