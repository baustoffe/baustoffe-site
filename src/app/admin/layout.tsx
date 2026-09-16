"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#141414] text-white p-4 flex flex-col gap-1">
        <p className="text-lg font-bold tracking-widest mb-4 px-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>BAUSTOFFE</p>
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[11px] uppercase tracking-wider px-3 py-2 transition-colors ${
              pathname === item.href ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
            }`}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link href="/" className="text-[11px] text-white/40 hover:text-white uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
