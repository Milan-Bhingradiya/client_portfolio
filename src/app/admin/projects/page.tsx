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
              {project.images[0] && (
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white truncate">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm">{project.companyName}</p>
                <p className="text-zinc-500 text-sm">{project.industryName}</p>

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
