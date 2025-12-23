"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProject, deleteProject } from "@/lib/api";
import { useRouter } from "next/navigation";

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
        {project.images?.[0] && (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
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
        <h2 className="text-lg font-semibold text-zinc-300 mb-3">Description</h2>
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

      {/* All Images */}
      <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-zinc-300 mb-4">
          All Images ({project.images?.length || 0})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {project.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${project.title} - Image ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg border border-zinc-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

