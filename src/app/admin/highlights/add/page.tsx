"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHighlight } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default function AddHighlightPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageDesktop, setImageDesktop] = useState<File | null>(null);
  const [imageMobile, setImageMobile] = useState<File | null>(null);
  const [previewDesktop, setPreviewDesktop] = useState<string | null>(null);
  const [previewMobile, setPreviewMobile] = useState<string | null>(null);

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

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageDesktop(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewDesktop(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageMobile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMobile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subtitle || !imageDesktop || !imageMobile) {
      alert("All fields including both images are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("imageDesktop", imageDesktop);
    formData.append("imageMobile", imageMobile);

    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/highlights"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-white">Add New Highlight</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Desktop Image */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🖥️</span>
              <div>
                <label className="block text-white font-semibold">
                  Desktop Image (Horizontal)
                </label>
                <span className="text-zinc-400 text-sm">
                  Landscape format for laptop/desktop screens
                </span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleDesktopImageChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-zinc-900 file:font-semibold hover:file:bg-amber-400"
            />
            {previewDesktop && (
              <div className="mt-4 relative">
                <Image
                  src={previewDesktop}
                  alt="Desktop Preview"
                  width={400}
                  height={225}
                  className="w-full h-48 object-contain rounded-lg border border-zinc-600 bg-zinc-800"
                />
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  16:9 Landscape
                </span>
              </div>
            )}
            {!previewDesktop && (
              <div className="mt-4 w-full h-48 bg-zinc-800 rounded-lg border-2 border-dashed border-zinc-600 flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <div className="text-4xl mb-2">📐</div>
                  <div>Horizontal Image</div>
                  <div className="text-xs">Recommended: 1920x1080</div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Image */}
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📱</span>
              <div>
                <label className="block text-white font-semibold">
                  Mobile Image (Vertical)
                </label>
                <span className="text-zinc-400 text-sm">
                  Portrait format for mobile screens
                </span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleMobileImageChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-zinc-900 file:font-semibold hover:file:bg-amber-400"
            />
            {previewMobile && (
              <div className="mt-4 relative flex justify-center">
                <Image
                  src={previewMobile}
                  alt="Mobile Preview"
                  width={200}
                  height={355}
                  className="h-48 w-auto object-contain rounded-lg border border-zinc-600 bg-zinc-800"
                />
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  9:16 Portrait
                </span>
              </div>
            )}
            {!previewMobile && (
              <div className="mt-4 w-full h-48 bg-zinc-800 rounded-lg border-2 border-dashed border-zinc-600 flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <div className="text-4xl mb-2">📱</div>
                  <div>Vertical Image</div>
                  <div className="text-xs">Recommended: 1080x1920</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Fields */}
        <div className="grid md:grid-cols-2 gap-6">
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
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-amber-500 text-zinc-900 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 text-lg"
        >
          {mutation.isPending ? "Adding Highlight..." : "Add Highlight"}
        </button>
      </form>
    </div>
  );
}
