"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "@/lib/api";

export default function AddProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    description: "",
    industryName: "",
    companyName: "",
    solution: "",
    challenges: ["", "", "", ""],
  });

  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      alert("Project added successfully!");
      router.push("/admin/projects");
    },
    onError: (error: Error) => {
      alert(error.message || "Failed to add project");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChallengeChange = (index: number, value: string) => {
    const newChallenges = [...formData.challenges];
    newChallenges[index] = value;
    setFormData({ ...formData, challenges: newChallenges });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("client", formData.client);
    form.append("description", formData.description);
    form.append("industryName", formData.industryName);
    form.append("companyName", formData.companyName);
    form.append("solution", formData.solution);
    formData.challenges
      .filter(Boolean)
      .forEach((c) => form.append("challenges[]", c));
    images.forEach((img) => form.append("images", img));

    mutation.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-zinc-300 mb-2">
            Project Images (First is thumbnail)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700"
          />
          {images.length > 0 && (
            <p className="text-sm text-zinc-400 mt-2">
              {images.length} images selected
            </p>
          )}
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Client Name</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Industry Name</label>
          <input
            type="text"
            name="industryName"
            value={formData.industryName}
            onChange={handleChange}
            required
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Solution</label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-2">Challenges</label>
          {formData.challenges.map((challenge, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Challenge ${idx + 1}`}
              value={challenge}
              onChange={(e) => handleChallengeChange(idx, e.target.value)}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none mb-2"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-amber-500 text-zinc-900 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {mutation.isPending ? "Adding Project..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
