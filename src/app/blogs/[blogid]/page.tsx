"use client";
import Image from "next/image";
import { notFound } from "next/navigation";

// Dummy blog data (should match blogs/page.tsx)
const blogs = [
  {
    id: "1",
    title: "How to Build a Brand in 2025",
    summary:
      "A step-by-step guide to building a memorable brand in the digital age.",
    image: "/branding.png",
    content: `\
      <p>Building a brand in 2025 requires a blend of creativity, technology, and authenticity. In this blog, we cover:</p>
      <ul>
        <li>Defining your brand values</li>
        <li>Leveraging digital channels</li>
        <li>Creating memorable experiences</li>
      </ul>
      <p>Stay tuned for more insights!</p>
    `,
  },
  {
    id: "2",
    title: "Marketing Automation Trends",
    summary:
      "Discover the latest in marketing automation and how to leverage it for growth.",
    image: "/devlopment.png",
    content: `\
      <p>Marketing automation is evolving rapidly. Key trends include:</p>
      <ul>
        <li>AI-driven personalization</li>
        <li>Omnichannel automation</li>
        <li>Real-time analytics</li>
      </ul>
      <p>Implement these trends to stay ahead!</p>
    `,
  },
  {
    id: "3",
    title: "UI/UX Best Practices",
    summary: "Top UI/UX tips for creating engaging digital experiences.",
    image: "/UIUX.png",
    content: `\
      <p>Great UI/UX is essential for user engagement. Best practices include:</p>
      <ul>
        <li>Consistent design language</li>
        <li>Accessibility first</li>
        <li>Fast load times</li>
      </ul>
      <p>Apply these tips to delight your users!</p>
    `,
  },
];

export default function BlogDetailPage({
  params,
}: {
  params: { blogid: string };
}) {
  const blog = blogs.find((b) => b.id === params.blogid);
  if (!blog) return notFound();
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <div className="relative w-full h-72 mb-8 rounded-lg overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
