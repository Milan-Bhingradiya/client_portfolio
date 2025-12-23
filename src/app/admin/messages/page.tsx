"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMessages, type Message } from "@/lib/api";

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
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{msg.title}</h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-amber-400 hover:underline text-sm"
                  >
                    {msg.email}
                  </a>
                </div>
                <span className="text-zinc-500 text-sm">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-zinc-300 whitespace-pre-wrap">{msg.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
