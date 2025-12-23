"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlogs, deleteBlog, type Blog } from "@/lib/api";
import Image from "next/image";

export default function BlogsPage() {
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: () => {
      alert("Failed to delete blog");
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this blog?")) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="text-zinc-400">Loading blogs...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Blogs</h1>
        <Link
          href="/admin/blogs/add"
          className="bg-amber-500 text-zinc-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          + Add Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-zinc-400">No blogs yet. Write your first blog!</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog: Blog) => (
            <Link
              key={blog._id}
              href={`/admin/blogs/${blog._id}`}
              className="block bg-zinc-800 rounded-xl p-4 border border-zinc-700 hover:border-amber-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                {blog.imageUrl && (
                  <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {blog.title}
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(e, blog._id)}
                  disabled={deleteMutation.isPending}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500 disabled:opacity-50"
                >
                  {deleteMutation.isPending ? "..." : "Delete"}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
