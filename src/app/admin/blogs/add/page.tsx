"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBlog } from "@/lib/api";

export default function AddBlogPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      alert("Blog added successfully!");
      router.push("/admin/blogs");
    },
    onError: (error: Error) => {
      alert(error.message || "Failed to add blog");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-zinc-300 mb-2">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">
            Content (Markdown supported)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={15}
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none resize-none font-mono text-sm"
            placeholder="Write your blog content here. Markdown is supported."
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-amber-500 text-zinc-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {mutation.isPending ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
