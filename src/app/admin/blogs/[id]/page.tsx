"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBlog, deleteBlog } from "@/lib/api";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function AdminBlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: () => fetchBlog(params.id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      router.push("/admin/blogs");
    },
    onError: () => {
      alert("Failed to delete blog");
    },
  });

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    deleteMutation.mutate(params.id);
  };

  if (isLoading) {
    return <div className="text-zinc-400">Loading blog...</div>;
  }

  if (error || !blog) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 mb-4">Blog not found</p>
        <Link href="/admin/blogs" className="text-amber-400 hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/blogs"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to Blogs
        </Link>
        <div className="flex gap-3">
          <Link
            href={`/blogs/${params.id}`}
            target="_blank"
            className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
          >
            View on Site
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Blog"}
          </button>
        </div>
      </div>

      {/* Blog Header */}
      <div className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 mb-8">
        {blog.imageUrl && (
          <div className="relative w-full h-64">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{blog.title}</h1>
          <p className="text-zinc-500 text-sm">
            Created: {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">Content</h2>
        <div className="prose prose-invert prose-zinc max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-2xl font-bold text-white mt-6 mb-4"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-xl font-semibold text-white mt-5 mb-3"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-lg font-semibold text-zinc-200 mt-4 mb-2"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p className="text-zinc-300 mb-4 leading-relaxed" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="list-disc list-inside text-zinc-300 mb-4 space-y-1"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="list-decimal list-inside text-zinc-300 mb-4 space-y-1"
                  {...props}
                />
              ),
              li: ({ ...props }) => <li className="text-zinc-300" {...props} />,
              code: ({ ...props }) => (
                <code
                  className="bg-zinc-900 px-2 py-1 rounded text-amber-400 text-sm"
                  {...props}
                />
              ),
              pre: ({ ...props }) => (
                <pre
                  className="bg-zinc-900 p-4 rounded-lg overflow-x-auto my-4"
                  {...props}
                />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-amber-500 pl-4 italic text-zinc-400 my-4"
                  {...props}
                />
              ),
              a: ({ ...props }) => (
                <a className="text-amber-400 hover:underline" {...props} />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Raw Markdown Preview */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mt-6">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">
          Raw Markdown
        </h2>
        <pre className="bg-zinc-900 p-4 rounded-lg text-zinc-400 text-sm overflow-x-auto whitespace-pre-wrap">
          {blog.content}
        </pre>
      </div>
    </div>
  );
}
