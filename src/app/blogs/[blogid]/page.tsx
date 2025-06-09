"use client";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";

export default function BlogDetailPage({
  params,
}: {
  params: { blogid: string };
}) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="h-8" />
      <h1 className="text-4xl font-bold mb-6 break-words leading-tight text-gray-900">
        {blog.title}
      </h1>
      <div className="relative w-full h-64 sm:h-96 mb-10 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 700px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div
        className="prose prose-xl max-w-none bg-white/90 rounded-2xl p-8 shadow-lg border border-gray-200
  prose-pre:bg-gray-900 prose-pre:text-white prose-code:text-pink-600 prose-img:rounded-xl
  prose-table:table-auto prose-th:bg-gray-200 prose-th:p-2 prose-td:p-2 prose-td:border prose-td:border-gray-300
  prose-p:my-6 prose-h1:mb-8 prose-h2:mb-7 prose-h3:mb-6"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            h1: ({ node, ...props }) => (
              <>
                <div className="h-8" />
                <h1
                  className="text-4xl font-bold mb-8 text-gray-900"
                  {...props}
                />
              </>
            ),
            h2: ({ node, ...props }) => (
              <>
                <div className="h-6" />
                <h2
                  className="text-3xl font-semibold mb-6 text-gray-800"
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
  );
}
