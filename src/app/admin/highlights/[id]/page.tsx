"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchHighlight,
  updateHighlight,
  deleteHighlight,
} from "@/lib/api";
import Link from "next/link";

export default function EditHighlightPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data: highlight, isLoading } = useQuery({
    queryKey: ["highlight", params.id],
    queryFn: () => fetchHighlight(params.id),
  });

  useEffect(() => {
    if (highlight) {
      setTitle(highlight.title);
      setSubtitle(highlight.subtitle);
      setIsActive(highlight.isActive);
    }
  }, [highlight]);

  const updateMutation = useMutation({
    mutationFn: (data: { title: string; subtitle: string; isActive: boolean }) =>
      updateHighlight(params.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      queryClient.invalidateQueries({ queryKey: ["highlight", params.id] });
      alert("Highlight updated!");
      router.push("/admin/highlights");
    },
    onError: () => {
      alert("Failed to update highlight");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      router.push("/admin/highlights");
    },
    onError: () => {
      alert("Failed to delete highlight");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle) {
      alert("Title and subtitle are required!");
      return;
    }
    updateMutation.mutate({ title, subtitle, isActive });
  };

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this highlight?")) return;
    deleteMutation.mutate(params.id);
  };

  if (isLoading) {
    return <div className="text-zinc-400">Loading...</div>;
  }

  if (!highlight) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 mb-4">Highlight not found</p>
        <Link href="/admin/highlights" className="text-amber-400 hover:underline">
          ← Back to Highlights
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/highlights"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit Highlight</h1>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {/* Current Image */}
      <div className="mb-6">
        <label className="block text-zinc-300 mb-2">Current Image</label>
        <img
          src={highlight.image}
          alt={highlight.title}
          className="w-48 h-64 object-cover rounded-lg border border-zinc-600"
        />
        <p className="text-zinc-500 text-sm mt-2">
          To change the image, delete this highlight and create a new one.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-zinc-300 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5 rounded bg-zinc-800 border-zinc-600"
          />
          <label htmlFor="isActive" className="text-zinc-300">
            Active (visible in slider)
          </label>
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="w-full bg-amber-500 text-zinc-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

