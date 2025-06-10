"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogDetailPage({
  params,
}: {
  params: { blogid: string };
}) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname();
  const [showShare, setShowShare] = useState(false);
  const shareUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  useEffect(() => {
    fetch(
      `https://smit-shah-backend-80da1d71856d.herokuapp.com/blog/${params.blogid}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.blog || null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog.");
        setLoading(false);
      });
  }, [params.blogid]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
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

      {/* Floating Share Button (left bottom) */}
      <button
        onClick={() => setShowShare((s) => !s)}
        className="fixed left-4 bottom-6 z-40 bg-purple-600 hover:bg-purple-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl border-2 border-white transition-all duration-200"
        aria-label="Share"
      >
        {/* 3-dot share icon */}
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
            className="fixed left-6 bottom-24 z-50 bg-white/95 rounded-2xl shadow-2xl p-5 flex flex-col gap-3 border border-gray-200 w-64 max-w-[90vw]"
          >
            <span className="font-semibold text-gray-700 mb-1 text-base flex items-center gap-2">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-purple-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.274.962-.687 1.87-1.222 2.682M15 19.197A9.969 9.969 0 0112 21c-4.478 0-8.268-2.943-9.542-7 .274-.962.687-1.87 1.222-2.682"
                />
              </svg>
              Share this blog
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                blog.title + " " + shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-green-700 font-medium text-sm transition"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-green-500"
              >
                <path d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.98L0 24l6.18-1.62A12.07 12.07 0 0012 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 font-medium text-sm transition"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-blue-600"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                shareUrl
              )}&title=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-800 font-medium text-sm transition"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="text-blue-800"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.07-.926-2.07-2.07 0-1.143.926-2.07 2.07-2.07 1.143 0 2.07.927 2.07 2.07 0 1.144-.927 2.07-2.07 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z" />
              </svg>
              LinkedIn
            </a>
            <button
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline flex items-center gap-1"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Copy Link
            </button>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold bg-white/70 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setShowShare(false)}
              aria-label="Close share menu"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Markdown Content */}
      <div className="max-w-3xl mx-auto px-4">
        <div
          className="prose prose-xl max-w-none p-4 sm:p-8
        prose-pre:bg-gray-900 prose-pre:text-white prose-code:text-pink-600 prose-img:rounded-xl
        prose-table:table-auto prose-th:bg-gray-200 prose-th:p-2 prose-td:p-2 prose-td:border prose-td:border-gray-300
        prose-p:my-6 prose-h1:mb-8 prose-h2:mb-7 prose-h3:mb-6 text-left"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              h1: ({ node, ...props }) => (
                <>
                  <div className="h-8" />
                  <h1
                    className="text-4xl font-bold mb-8 text-gray-900 text-left"
                    {...props}
                  />
                </>
              ),
              h2: ({ node, ...props }) => (
                <>
                  <div className="h-6" />
                  <h2
                    className="text-3xl font-semibold mb-6 text-gray-800 text-left"
                    {...props}
                  />
                </>
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto">
                  <table {...props} />
                </div>
              ),
              pre: ({ node, ...props }) => (
                <pre
                  {...props}
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
