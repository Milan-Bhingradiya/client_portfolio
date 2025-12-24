"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProject, deleteProject } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Monitor, Square, Images, LayoutGrid } from "lucide-react";

export default function AdminProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => fetchProject(params.id),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/admin/projects");
    },
    onError: () => {
      alert("Failed to delete project");
    },
  });

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    deleteMutation.mutate(params.id);
  };

  if (isLoading) {
    return <div className="text-zinc-400">Loading project...</div>;
  }

  if (error || !project) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 mb-4">Project not found</p>
        <Link href="/admin/projects" className="text-amber-400 hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/admin/projects"
          className="text-zinc-400 hover:text-white transition-colors"
        >
          ← Back to Projects
        </Link>
        <div className="flex gap-3">
          <Link
            href={`/work/${params.id}`}
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
            {deleteMutation.isPending ? "Deleting..." : "Delete Project"}
          </button>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 mb-6">
        <div className="relative w-full h-64">
          <Image
            src={project.heroImage || "/projectbanner.jpg"}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-blue-500/90 text-white text-xs px-2 py-1 rounded-lg">
            <Monitor className="w-3 h-3" />
            {project.heroImage ? "Hero Image" : "Cover Image (Legacy)"}
          </div>
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
              {project.industryName}
            </span>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
              {project.companyName}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-zinc-300">
              Card Thumbnail
            </h2>
            <span className="text-xs text-zinc-500 ml-2">(4:5 Portrait)</span>
          </div>
          <div className="max-w-xs">
            <div className="relative aspect-[4/5]">
              <Image
                src={project.thumbnail}
                alt={`${project.title} - Thumbnail`}
                fill
                className="object-cover rounded-lg border border-zinc-600"
              />
              <div className="absolute top-2 left-2 bg-amber-500/90 text-zinc-900 text-xs px-2 py-1 rounded font-semibold">
                Card Image
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-300 mb-3">Client</h2>
          <p className="text-white">{project.client}</p>
        </div>
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-300 mb-3">Industry</h2>
          <p className="text-white">{project.industryName}</p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-300 mb-3">
          Description
        </h2>
        <p className="text-zinc-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Solution */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-300 mb-3">Solution</h2>
        <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
      </div>

      {/* Challenges */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-300 mb-3">Challenges</h2>
        <ul className="space-y-2">
          {project.challenges?.map((challenge, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-zinc-900 rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-zinc-300">{challenge}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Square Images */}
      {project.squareImages && project.squareImages.length > 0 && (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Square className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-zinc-300">
              Square Images ({project.squareImages.length})
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {project.squareImages.map((img, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={img}
                  alt={`${project.title} - Square ${index + 1}`}
                  fill
                  className="object-cover rounded-lg border border-zinc-600"
                />
                <div className="absolute top-2 left-2 bg-violet-500/90 text-white text-xs px-2 py-1 rounded">
                  1:1 Square
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Images */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Images className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-zinc-300">
              Gallery Images ({project.galleryImages.length})
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.galleryImages.map((img, index) => (
              <div key={index} className="relative w-full h-40">
                <Image
                  src={img}
                  alt={`${project.title} - Gallery ${index + 1}`}
                  fill
                  className="object-cover rounded-lg border border-zinc-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legacy Images (old projects) */}
      {project.images && project.images.length > 0 && !project.heroImage && (
        <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Images className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-zinc-300">
              All Images - Legacy Format ({project.images.length})
            </h2>
          </div>
          <p className="text-amber-400 text-sm mb-4">
            ⚠️ This project uses the old image format. Consider re-uploading with the new structure.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.images.map((img, index) => (
              <div key={index} className="relative w-full h-40">
                <Image
                  src={img}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg border border-zinc-600"
                />
                <div className="absolute top-2 left-2 bg-amber-500/90 text-zinc-900 text-xs px-2 py-1 rounded">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
