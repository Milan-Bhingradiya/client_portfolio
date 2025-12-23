"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHighlight } from "@/lib/api";
import Link from "next/link";

export default function AddHighlightPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: addHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      alert("Highlight added successfully!");
      router.push("/admin/highlights");
    },
    onError: (error: Error) => {
      alert(error.message || "Failed to add highlight");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !image) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", image);

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/highlights"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-white">Add New Highlight</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-zinc-300 mb-2">
            Image (Recommended: 800x1000 portrait)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700"
          />
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-64 object-cover rounded-lg border border-zinc-600"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Mountain Dreams"
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g., Confidence is the best outfit"
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-amber-500 text-zinc-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {mutation.isPending ? "Adding Highlight..." : "Add Highlight"}
        </button>
      </form>
    </div>
  );
}
