"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchHighlights,
  deleteHighlight,
  reorderHighlights,
  type Highlight,
} from "@/lib/api";
import { useState } from "react";
import Image from "next/image";

export default function HighlightsPage() {
  const queryClient = useQueryClient();
  const [reordering, setReordering] = useState(false);

  const { data: highlights = [], isLoading } = useQuery({
    queryKey: ["highlights"],
    queryFn: fetchHighlights,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHighlight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
    onError: () => {
      alert("Failed to delete highlight");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: reorderHighlights,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
      setReordering(false);
    },
    onError: () => {
      alert("Failed to reorder highlights");
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this highlight?")) return;
    deleteMutation.mutate(id);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = highlights.map((h, i) => ({
      id: h._id,
      order: i === index ? i - 1 : i === index - 1 ? i + 1 : i,
    }));
    reorderMutation.mutate(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === highlights.length - 1) return;
    const newOrder = highlights.map((h, i) => ({
      id: h._id,
      order: i === index ? i + 1 : i === index + 1 ? i - 1 : i,
    }));
    reorderMutation.mutate(newOrder);
  };

  if (isLoading) {
    return <div className="text-zinc-400">Loading highlights...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Work Highlights</h1>
          <p className="text-zinc-400 mt-1">
            Manage the highlights shown in the slider on the homepage
          </p>
        </div>
        <Link
          href="/admin/highlights/add"
          className="bg-amber-500 text-zinc-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          + Add Highlight
        </Link>
      </div>

      {highlights.length === 0 ? (
        <div className="bg-zinc-800 rounded-xl p-8 text-center border border-zinc-700">
          <p className="text-zinc-400 mb-4">No highlights yet.</p>
          <Link
            href="/admin/highlights/add"
            className="text-amber-400 hover:underline"
          >
            Add your first highlight →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {highlights.map((highlight: Highlight, index: number) => (
            <div
              key={highlight._id}
              className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden"
            >
              <div className="flex items-center">
                {/* Order Controls */}
                <div className="flex flex-col border-r border-zinc-700 p-2">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0 || reorderMutation.isPending}
                    className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                  <span className="text-center text-zinc-500 text-sm font-bold">
                    {index + 1}
                  </span>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={
                      index === highlights.length - 1 ||
                      reorderMutation.isPending
                    }
                    className="p-2 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Images - Desktop and Mobile */}
                <div className="flex gap-2 p-2">
                  {/* Desktop Image Preview */}
                  <div className="relative">
                    <Image
                      src={highlight.imageDesktop}
                      alt={`${highlight.title} - Desktop`}
                      width={120}
                      height={68}
                      className="w-28 h-16 object-contain bg-zinc-900 rounded border border-zinc-600"
                    />
                    <span className="absolute -top-1 -left-1 bg-blue-500 text-white text-[10px] px-1 rounded">
                      🖥️
                    </span>
                  </div>
                  {/* Mobile Image Preview */}
                  <div className="relative">
                    <Image
                      src={highlight.imageMobile}
                      alt={`${highlight.title} - Mobile`}
                      width={45}
                      height={80}
                      className="w-10 h-16 object-contain bg-zinc-900 rounded border border-zinc-600"
                    />
                    <span className="absolute -top-1 -left-1 bg-green-500 text-white text-[10px] px-1 rounded">
                      📱
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-1">
                    {highlight.subtitle}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-4">
                  <Link
                    href={`/admin/highlights/${highlight._id}`}
                    className="px-3 py-1 bg-zinc-700 text-white text-sm rounded hover:bg-zinc-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => handleDelete(e, highlight._id)}
                    disabled={deleteMutation.isPending}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-500 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
        <h3 className="text-white font-semibold mb-2">💡 Tips</h3>
        <ul className="text-zinc-400 text-sm space-y-1">
          <li>• Use the arrows to reorder highlights</li>
          <li>• First highlight appears first in the slider</li>
          <li>
            • 🖥️ Desktop image: Horizontal (16:9) - Recommended: 1920x1080
          </li>
          <li>• 📱 Mobile image: Vertical (9:16) - Recommended: 1080x1920</li>
          <li>• Images are shown 100% without cropping</li>
        </ul>
      </div>
    </div>
  );
}
