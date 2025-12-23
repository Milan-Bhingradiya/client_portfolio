"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchBlog } from "@/lib/api";

export default function BlogDetailPage({
  params,
}: {
  params: { blogid: string };
}) {
  const pathname = usePathname();
  const [showShare, setShowShare] = useState(false);
  const shareUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", params.blogid],
    queryFn: () => fetchBlog(params.blogid),
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error || !blog) return notFound();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Poster */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] mb-12 overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-10 left-0 right-0 px-4 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg text-left ml-16 mb-4">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Floating Share Button */}
      <button
        onClick={() => setShowShare((s) => !s)}
        className="fixed bottom-6 left-4 sm:left-4 sm:bottom-6 right-4 sm:right-auto sm:w-14 sm:h-14 w-12 h-12 z-40 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-all duration-200"
        aria-label="Share"
      >
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="5" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <circle cx="19" cy="12" r="2" fill="currentColor" />
        </svg>
      </button>

      {/* Share Popup */}
      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 left-6 sm:left-6 sm:bottom-24 right-6 sm:right-auto z-50 bg-white/95 rounded-2xl shadow-2xl p-5 flex flex-col gap-3 border border-gray-200 w-64 max-w-[90vw]"
          >
            <span className="font-semibold text-gray-700 mb-1 text-base flex items-center gap-2">
              Share this blog
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-green-700 font-medium transition"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 font-medium transition"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-800 font-medium transition"
            >
              LinkedIn
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Copy Link
            </button>
            <button
              onClick={() => setShowShare(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            h1: ({ ...props }) => (
              <h1
                className="mt-12 mb-6 text-3xl sm:text-4xl font-bold text-gray-900"
                {...props}
              />
            ),
            h2: ({ ...props }) => (
              <h2
                className="mt-10 mb-4 text-2xl sm:text-3xl font-semibold text-gray-800"
                {...props}
              />
            ),
            h3: ({ ...props }) => (
              <h3
                className="mt-8 mb-3 text-xl sm:text-2xl font-semibold text-gray-700"
                {...props}
              />
            ),
            p: ({ ...props }) => (
              <p className="mb-4 text-gray-800 leading-relaxed" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc ml-6 mb-4" {...props} />
            ),
            ol: ({ ...props }) => (
              <ol className="list-decimal ml-6 mb-4" {...props} />
            ),
            li: ({ ...props }) => <li className="mb-2" {...props} />,
            table: ({ ...props }) => (
              <div className="overflow-x-auto my-6">
                <table
                  className="min-w-full border border-gray-300"
                  {...props}
                />
              </div>
            ),
            th: ({ ...props }) => (
              <th
                className="border px-4 py-2 bg-gray-100 text-left"
                {...props}
              />
            ),
            td: ({ ...props }) => (
              <td className="border px-4 py-2" {...props} />
            ),
            code({
              inline,
              className,
              children,
              ...props
            }: {
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
            }) {
              return !inline ? (
                <pre className="my-4">
                  <code
                    className={
                      className +
                      " rounded bg-gray-100 p-2 block overflow-x-auto"
                    }
                  >
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 rounded px-1 py-0.5">
                  {children}
                </code>
              );
            },
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
