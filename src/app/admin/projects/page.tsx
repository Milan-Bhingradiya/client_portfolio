"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, deleteProject, type Project } from "@/lib/api";
import Image from "next/image";

export default function ProjectsPage() {
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      alert("Failed to delete project");
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this project?")) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="text-zinc-400">Loading projects...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/add"
          className="bg-amber-500 text-zinc-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
        >
          + Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-zinc-400">
          No projects yet. Add your first project!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: Project) => (
            <Link
              key={project._id}
              href={`/admin/projects/${project._id}`}
              className="block bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:border-amber-500 transition-colors"
            >
              <div className="relative w-full h-48">
                <Image
                  src={
                    project.thumbnail ||
                    project.heroImage ||
                    "/projectbanner.jpg"
                  }
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-amber-500/90 text-zinc-900 text-xs px-2 py-1 rounded font-semibold">
                    Thumb
                  </span>
                  <span className="bg-violet-500/90 text-white text-xs px-2 py-1 rounded font-semibold">
                    {project.squareImages?.length || 0}×□
                  </span>
                  <span className="bg-emerald-500/90 text-white text-xs px-2 py-1 rounded font-semibold">
                    {project.galleryImages?.length || 0}×📷
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm">{project.companyName}</p>
                <p className="text-zinc-500 text-sm">{project.industryName}</p>

                {/* Image counts */}
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-zinc-500">
                  {project.heroImage && <span>🖼️ Hero</span>}
                  {project.squareImages && project.squareImages.length > 0 && (
                    <span>◻️ {project.squareImages.length} Square</span>
                  )}
                  {project.galleryImages &&
                    project.galleryImages.length > 0 && (
                      <span>📸 {project.galleryImages.length} Gallery</span>
                    )}
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={(e) => handleDelete(e, project._id)}
                    disabled={deleteMutation.isPending}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-500 disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? "..." : "Delete"}
                  </button>
                  <span className="px-3 py-1 bg-zinc-700 text-zinc-300 text-xs rounded">
                    ID: {project._id.slice(-6)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
