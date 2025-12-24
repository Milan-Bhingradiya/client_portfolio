export interface Project {
  _id: string;
  title: string;
  client: string;
  description: string;
  thumbnail: string; // Card thumbnail (4:5, 400x500)
  heroImage: string; // Main horizontal image (16:9, 1920x1080)
  squareImages: string[]; // Exactly 2 square images (1:1, 800x800)
  galleryImages: string[]; // Additional gallery images
  industryName: string;
  companyName: string;
  solution: string;
  show_in_home_page: boolean;
  challenges: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Helper to get all project images for gallery
export function getAllProjectImages(project: Project): string[] {
  return [
    project.heroImage,
    ...(project.squareImages || []),
    ...(project.galleryImages || []),
  ].filter(Boolean);
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export interface Message {
  _id: string;
  fullName: string;
  companyName: string;
  phone?: string;
  email: string;
  message: string;
  source: "home" | "contact";
  createdAt: string;
}

// Projects
export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return data.projects || [];
}

export async function fetchProject(id: string): Promise<Project> {
  const res = await fetch(`/api/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  const data = await res.json();
  return data.project;
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
}

export async function addProject(formData: FormData): Promise<Project> {
  const res = await fetch("/api/projects", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to add project");
  }
  const data = await res.json();
  return data.project;
}

// Blogs
export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch("/api/blogs");
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.blogs || [];
}

export async function fetchBlog(id: string): Promise<Blog> {
  const res = await fetch(`/api/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  const data = await res.json();
  return data.blog;
}

export async function deleteBlog(id: string): Promise<void> {
  const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete blog");
}

export async function addBlog(formData: FormData): Promise<Blog> {
  const res = await fetch("/api/blogs", { method: "POST", body: formData });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to add blog");
  }
  const data = await res.json();
  return data.blog;
}

// Messages
export async function fetchMessages(): Promise<Message[]> {
  const res = await fetch("/api/messages");
  if (!res.ok) throw new Error("Failed to fetch messages");
  const data = await res.json();
  return data.messages || [];
}

export interface SendMessageData {
  fullName: string;
  companyName: string;
  phone?: string;
  email: string;
  message: string;
  source?: "home" | "contact";
}

export async function sendMessage(data: SendMessageData): Promise<void> {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const responseData = await res.json();
    throw new Error(responseData.error || "Failed to send message");
  }
}

// Home Projects
export async function fetchHomeProjects(): Promise<Project[]> {
  const res = await fetch("/api/home-projects");
  if (!res.ok) throw new Error("Failed to fetch home projects");
  const data = await res.json();
  return data.projects || [];
}

// Highlights
export interface Highlight {
  _id: string;
  imageDesktop: string; // Horizontal/Landscape for laptop
  imageMobile: string; // Vertical/Portrait for mobile
  title: string;
  subtitle: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export async function fetchHighlights(): Promise<Highlight[]> {
  const res = await fetch("/api/highlights");
  if (!res.ok) throw new Error("Failed to fetch highlights");
  const data = await res.json();
  return data.highlights || [];
}

export async function fetchHighlight(id: string): Promise<Highlight> {
  const res = await fetch(`/api/highlights/${id}`);
  if (!res.ok) throw new Error("Failed to fetch highlight");
  const data = await res.json();
  return data.highlight;
}

export async function addHighlight(formData: FormData): Promise<Highlight> {
  const res = await fetch("/api/highlights", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to add highlight");
  }
  const data = await res.json();
  return data.highlight;
}

export async function updateHighlight(
  id: string,
  data: Partial<Highlight>
): Promise<Highlight> {
  const res = await fetch(`/api/highlights/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update highlight");
  const responseData = await res.json();
  return responseData.highlight;
}

export async function deleteHighlight(id: string): Promise<void> {
  const res = await fetch(`/api/highlights/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete highlight");
}

export async function reorderHighlights(
  highlights: { id: string; order: number }[]
): Promise<void> {
  const res = await fetch("/api/highlights/reorder", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ highlights }),
  });
  if (!res.ok) throw new Error("Failed to reorder highlights");
}
