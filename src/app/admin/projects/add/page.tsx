"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "@/lib/api";
import Image from "next/image";
import {
  Monitor,
  Square,
  Images,
  AlertCircle,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";

export default function AddProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Separate image states
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  const [squareImages, setSquareImages] = useState<File[]>([]);
  const [squarePreviews, setSquarePreviews] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

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

  // Thumbnail Handler
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Hero Image Handler
  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setHeroPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Square Images Handler (max 2)
  const handleSquareImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 2) : [];
    setSquareImages(files);

    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setSquarePreviews([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (files.length === 0) setSquarePreviews([]);
  };

  // Gallery Images Handler
  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setGalleryImages(files);

    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setGalleryPreviews([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (files.length === 0) setGalleryPreviews([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required images
    if (!thumbnail) {
      alert("Card Thumbnail is required!");
      return;
    }

    if (!heroImage) {
      alert("Hero banner image is required!");
      return;
    }

    if (squareImages.length !== 2) {
      alert("Exactly 2 square images are required!");
      return;
    }

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

    // Append images
    form.append("thumbnail", thumbnail);
    form.append("heroImage", heroImage);
    squareImages.forEach((img) => form.append("squareImages", img));
    galleryImages.forEach((img) => form.append("galleryImages", img));

    mutation.mutate(form);
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload Section */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Images className="w-5 h-5 text-amber-500" />
            Project Images
          </h2>

          {/* Thumbnail (Card Image) */}
          <div className="mb-8 pb-8 border-b border-zinc-700">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <LayoutGrid className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Card Thumbnail <span className="text-red-400">*</span>
                </h3>
                <p className="text-zinc-400 text-sm">
                  This image is shown on the project cards in the /work page
                </p>
              </div>
            </div>

            {/* Size Guidelines */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 mb-4 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-400 font-medium mb-1">
                    📸 Thumbnail Requirements:
                  </p>
                  <ul className="text-zinc-300 space-y-1">
                    <li>
                      •{" "}
                      <strong className="text-white">Recommended Size:</strong>{" "}
                      400 × 500 pixels (4:5 portrait ratio)
                    </li>
                    <li>
                      • <strong className="text-white">Minimum Size:</strong>{" "}
                      320 × 400 pixels
                    </li>
                    <li>
                      • <strong className="text-white">Max Size:</strong> 800 ×
                      1000 pixels
                    </li>
                    <li>
                      • <strong className="text-white">Format:</strong> JPG,
                      PNG, or WebP
                    </li>
                    <li>
                      • <strong className="text-white">Max File Size:</strong>{" "}
                      2MB (smaller is better for load speed)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-zinc-900 file:font-semibold hover:file:bg-amber-400"
            />

            <div className="mt-4 grid grid-cols-2 gap-4">
              {thumbnailPreview ? (
                <div className="relative">
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500/90 text-zinc-900 text-xs px-2 py-1 rounded-lg font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    4:5 Portrait
                  </div>
                  <Image
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    width={400}
                    height={500}
                    className="w-full aspect-[4/5] object-contain bg-zinc-800 rounded-xl border border-zinc-600"
                  />
                </div>
              ) : (
                <div className="aspect-[4/5] bg-zinc-800 rounded-xl border-2 border-dashed border-amber-500/30 flex items-center justify-center">
                  <div className="text-center text-zinc-500">
                    <LayoutGrid className="w-10 h-10 mx-auto mb-2 text-amber-500/50" />
                    <p className="text-amber-400/70">Card Thumbnail</p>
                    <p className="text-xs mt-1">400 × 500</p>
                  </div>
                </div>
              )}
              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 flex flex-col justify-center">
                <h4 className="text-white font-medium mb-2">Preview on Card</h4>
                <p className="text-zinc-400 text-sm mb-3">
                  This image appears on:
                </p>
                <ul className="text-zinc-500 text-xs space-y-1">
                  <li>✓ Work page grid cards</li>
                  <li>✓ Work page list view</li>
                  <li>✓ Home page project showcase</li>
                  <li>✓ Related projects section</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Hero Banner Image <span className="text-red-400">*</span>
                </h3>
                <p className="text-zinc-400 text-sm">
                  Main horizontal image displayed at the top of the project page
                </p>
              </div>
            </div>

            {/* Size Guidelines */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4 border border-zinc-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-400 font-medium mb-1">
                    Image Requirements:
                  </p>
                  <ul className="text-zinc-400 space-y-1">
                    <li>
                      • <strong className="text-white">Required Size:</strong>{" "}
                      1920 × 1080 pixels (16:9 aspect ratio)
                    </li>
                    <li>
                      • <strong className="text-white">Minimum Size:</strong>{" "}
                      1280 × 720 pixels
                    </li>
                    <li>
                      • <strong className="text-white">Format:</strong> JPG,
                      PNG, or WebP
                    </li>
                    <li>
                      • <strong className="text-white">Max File Size:</strong>{" "}
                      5MB
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleHeroImageChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:font-semibold hover:file:bg-blue-400"
            />

            {heroPreview && (
              <div className="mt-4 relative">
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-green-500/90 text-white text-xs px-2 py-1 rounded-lg">
                  <CheckCircle2 className="w-3 h-3" />
                  16:9 Landscape
                </div>
                <Image
                  src={heroPreview}
                  alt="Hero Preview"
                  width={800}
                  height={450}
                  className="w-full h-64 object-contain bg-zinc-800 rounded-xl border border-zinc-600"
                />
              </div>
            )}
            {!heroPreview && (
              <div className="mt-4 w-full h-48 bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center">
                <div className="text-center text-zinc-500">
                  <Monitor className="w-10 h-10 mx-auto mb-2" />
                  <p>Horizontal Banner Image</p>
                  <p className="text-xs mt-1">1920 × 1080 recommended</p>
                </div>
              </div>
            )}
          </div>

          {/* Square Images */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Square className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Square Feature Images <span className="text-red-400">*</span>
                </h3>
                <p className="text-zinc-400 text-sm">
                  Exactly 2 square images displayed side by side in one row
                </p>
              </div>
            </div>

            {/* Size Guidelines */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4 border border-zinc-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-violet-400 font-medium mb-1">
                    Image Requirements:
                  </p>
                  <ul className="text-zinc-400 space-y-1">
                    <li>
                      • <strong className="text-white">Required Size:</strong>{" "}
                      800 × 800 pixels (1:1 aspect ratio)
                    </li>
                    <li>
                      • <strong className="text-white">Minimum Size:</strong>{" "}
                      600 × 600 pixels
                    </li>
                    <li>
                      • <strong className="text-white">Count:</strong>{" "}
                      <strong className="text-red-400">
                        Exactly 2 required
                      </strong>
                    </li>
                    <li>
                      • <strong className="text-white">Format:</strong> JPG,
                      PNG, or WebP
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleSquareImagesChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-violet-500 file:text-white file:font-semibold hover:file:bg-violet-400"
            />
            <p className="text-amber-400 text-xs mt-2 font-medium">
              ⚠️ Select exactly 2 square images (required)
            </p>
            {squareImages.length > 0 && squareImages.length !== 2 && (
              <p className="text-red-400 text-xs mt-1">
                Currently selected: {squareImages.length}/2 - Need exactly 2
              </p>
            )}
            {squareImages.length === 2 && (
              <p className="text-green-400 text-xs mt-1">✓ 2 images selected</p>
            )}

            {squarePreviews.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {squarePreviews.map((preview, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-violet-500/90 text-white text-xs px-2 py-1 rounded-lg">
                      <CheckCircle2 className="w-3 h-3" />
                      1:1 Square
                    </div>
                    <Image
                      src={preview}
                      alt={`Square ${idx + 1}`}
                      width={400}
                      height={400}
                      className="w-full aspect-square object-contain bg-zinc-800 rounded-xl border border-zinc-600"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[1, 2].map((num) => (
                  <div
                    key={num}
                    className="aspect-square bg-zinc-800 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center"
                  >
                    <div className="text-center text-zinc-500">
                      <Square className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Square #{num}</p>
                      <p className="text-xs mt-1">800 × 800</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Images className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Gallery Images (Optional)
                </h3>
                <p className="text-zinc-400 text-sm">
                  Additional images to showcase in the project gallery
                </p>
              </div>
            </div>

            {/* Size Guidelines */}
            <div className="bg-zinc-800/50 rounded-xl p-4 mb-4 border border-zinc-700">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-emerald-400 font-medium mb-1">
                    Image Requirements:
                  </p>
                  <ul className="text-zinc-400 space-y-1">
                    <li>
                      • <strong className="text-white">Recommended:</strong>{" "}
                      1600 × 900 pixels (16:9) or larger
                    </li>
                    <li>
                      • <strong className="text-white">Flexible:</strong> Any
                      aspect ratio accepted
                    </li>
                    <li>
                      • <strong className="text-white">Format:</strong> JPG,
                      PNG, or WebP
                    </li>
                    <li>
                      • <strong className="text-white">No limit:</strong> Add as
                      many as needed
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesChange}
              className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:text-white file:font-semibold hover:file:bg-emerald-400"
            />
            {galleryImages.length > 0 && (
              <p className="text-zinc-400 text-sm mt-2">
                {galleryImages.length} gallery images selected
              </p>
            )}

            {galleryPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {galleryPreviews.map((preview, idx) => (
                  <div key={idx} className="relative">
                    <Image
                      src={preview}
                      alt={`Gallery ${idx + 1}`}
                      width={200}
                      height={150}
                      className="w-full h-24 object-cover bg-zinc-800 rounded-lg border border-zinc-600"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project Details Section */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-6">
            Project Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-zinc-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Brand Redesign for Tech Startup"
                className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Acme Corp"
                  className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-zinc-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  placeholder="e.g., John Smith"
                  className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 mb-2">Industry *</label>
              <input
                type="text"
                name="industryName"
                value={formData.industryName}
                onChange={handleChange}
                required
                placeholder="e.g., Technology, Healthcare, Finance"
                className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Brief overview of the project..."
                className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2">Solution *</label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                required
                rows={4}
                placeholder="How we solved the client's challenges..."
                className="w-full bg-zinc-800 text-white rounded-lg p-3 border border-zinc-700 focus:border-amber-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2">Challenges *</label>
              <p className="text-zinc-500 text-sm mb-3">
                Add at least one challenge faced during the project
              </p>
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
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-900 py-4 rounded-xl font-semibold hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-50 text-lg"
        >
          {mutation.isPending ? "Adding Project..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
