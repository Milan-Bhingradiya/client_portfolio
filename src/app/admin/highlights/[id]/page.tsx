"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchHighlight, updateHighlight, deleteHighlight } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

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
    mutationFn: (data: {
      title: string;
      subtitle: string;
      isActive: boolean;
    }) => updateHighlight(params.id, data),
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
        <Link
          href="/admin/highlights"
          className="text-amber-400 hover:underline"
        >
          ← Back to Highlights
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
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

      {/* Current Images */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Desktop Image */}
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🖥️</span>
            <label className="text-white font-semibold">
              Desktop Image (Horizontal)
            </label>
          </div>
          {highlight.imageDesktop ? (
            <div className="relative">
              <Image
                src={highlight.imageDesktop}
                alt={`${highlight.title} - Desktop`}
                width={400}
                height={225}
                className="w-full h-48 object-contain rounded-lg border border-zinc-600 bg-zinc-800"
              />
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Landscape
              </span>
            </div>
          ) : (
            <div className="w-full h-48 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
              No desktop image
            </div>
          )}
        </div>

        {/* Mobile Image */}
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📱</span>
            <label className="text-white font-semibold">
              Mobile Image (Vertical)
            </label>
          </div>
          {highlight.imageMobile ? (
            <div className="relative flex justify-center">
              <Image
                src={highlight.imageMobile}
                alt={`${highlight.title} - Mobile`}
                width={200}
                height={355}
                className="h-48 w-auto object-contain rounded-lg border border-zinc-600 bg-zinc-800"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Portrait
              </span>
            </div>
          ) : (
            <div className="w-full h-48 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">
              No mobile image
            </div>
          )}
        </div>
      </div>

      <p className="text-zinc-500 text-sm mb-6 bg-zinc-900 p-3 rounded-lg">
        💡 To change images, delete this highlight and create a new one with
        updated images.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
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
