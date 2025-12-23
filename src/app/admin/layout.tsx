"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminAuth, { useAdminAuth } from "./components/AdminAuth";
import { LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/highlights", label: "✨ Highlights" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/messages", label: "Messages" },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-amber-400 mb-8">Admin Panel</h1>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-amber-500 text-zinc-900 font-semibold"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 pt-4 border-t border-zinc-800">
          <Link
            href="/"
            className="block text-zinc-500 hover:text-amber-400 text-sm"
          >
            ← Back to Site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-zinc-500 hover:text-red-400 text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuth>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuth>
  );
}
