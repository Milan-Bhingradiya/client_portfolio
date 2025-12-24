"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMessages, type Message } from "@/lib/api";
import { User, Building2, Phone, Mail, MessageSquare } from "lucide-react";

export default function MessagesPage() {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) {
    return <div className="text-zinc-400">Loading messages...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>

      {messages.length === 0 ? (
        <p className="text-zinc-400">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg: Message) => (
            <div
              key={msg._id}
              className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
            >
              {/* Header with timestamp and source badge */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                    {msg.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-zinc-400" />
                      {msg.fullName}
                    </h3>
                    <p className="text-zinc-400 text-sm flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      {msg.companyName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      msg.source === "home"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-violet-500/20 text-violet-400"
                    }`}
                  >
                    {msg.source === "home" ? "Home Page" : "Contact Page"}
                  </span>
                  <p className="text-zinc-500 text-sm mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-4 bg-zinc-900 rounded-lg">
                <a
                  href={`mailto:${msg.email}`}
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 hover:underline text-sm"
                >
                  <Mail className="w-4 h-4" />
                  {msg.email}
                </a>
                {msg.phone && (
                  <a
                    href={`tel:${msg.phone}`}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 hover:underline text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    +91 {msg.phone}
                  </a>
                )}
              </div>

              {/* Message */}
              <div className="bg-zinc-900 rounded-lg p-4">
                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Project Details
                </div>
                <p className="text-zinc-300 whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
