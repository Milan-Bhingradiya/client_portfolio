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

      {/* Floating Share Button (left bottom on desktop, right bottom on mobile) */}
      <button
        onClick={() => setShowShare((s) => !s)}
        className="fixed bottom-6 left-4 sm:left-4 sm:bottom-6 right-4 sm:right-auto sm:w-14 sm:h-14 w-12 h-12 z-40 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-all duration-200"
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
              <svg width="20" height="20" fill="currentColor" className="text-green-500"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.363.71.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M20.52 3.48A10 10 0 1 0 3.48 20.52 10 10 0 0 0 20.52 3.48zm-8.52 17.02c-1.64 0-3.22-.43-4.6-1.23l-5.02 1.31 1.34-4.89A8.96 8.96 0 0 1 2 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9z"/></svg>
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 font-medium transition"
            >
              <svg width="20" height="20" fill="currentColor" className="text-blue-600"><path d="M18.896 2.112A9.993 9.993 0 0 0 12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.261.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 text-blue-800 font-medium transition"
            >
              <svg width="20" height="20" fill="currentColor" className="text-blue-700"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.5 19h-3v-9h3v9zm-1.5-10.27c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm14.5 10.27h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74z"/></svg>
              LinkedIn
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><rect x="5" y="7" width="9" height="12" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/></svg>
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
            h1: ({ node, ...props }) => (
              <h1 className="mt-12 mb-6 text-3xl sm:text-4xl font-bold text-gray-900" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="mt-10 mb-4 text-2xl sm:text-3xl font-semibold text-gray-800" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="mt-8 mb-3 text-xl sm:text-2xl font-semibold text-gray-700" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-4 text-gray-800 leading-relaxed" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-6 mb-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal ml-6 mb-4" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="mb-2" {...props} />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300" {...props} />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th className="border px-4 py-2 bg-gray-100 text-left" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border px-4 py-2" {...props} />
            ),
            code({
              inline,
              className,
              children,
              node, // keep node for compatibility, but make it optional
              ...props
            }: {
              node?: any;
              inline?: boolean;
              className?: string;
              children?: React.ReactNode;
              [key: string]: any;
            }) {
              return !inline ? (
                <pre className="my-4">
                  <code className={className + " rounded bg-gray-100 p-2 block overflow-x-auto"}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>
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