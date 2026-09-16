"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState<{ products: number; orders: number; quotes: number; messages: number } | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const [products, orders, quotes, messages] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("quote_requests").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        products: products.count ?? 0,
        orders: orders.count ?? 0,
        quotes: quotes.count ?? 0,
        messages: messages.count ?? 0,
      });
    }
    fetchStats();
  }, []);

  const sections = [
    { href: "/admin/products", label: "Products", desc: "Manage product catalog, variants, and pricing." },
    { href: "/admin/categories", label: "Categories", desc: "Organize products into categories." },
    { href: "/admin/orders", label: "Orders", desc: "View and manage customer orders." },
    { href: "/admin/quotes", label: "Quotes", desc: "Handle custom quote requests." },
    { href: "/admin/messages", label: "Messages", desc: "Review contact form submissions." },
    { href: "/admin/settings", label: "Settings", desc: "Configure site-wide settings." },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Products", value: stats?.products ?? "...", href: "/admin/products" },
          { label: "Orders", value: stats?.orders ?? "...", href: "/admin/orders" },
          { label: "Quotes", value: stats?.quotes ?? "...", href: "/admin/quotes" },
          { label: "Messages", value: stats?.messages ?? "...", href: "/admin/messages" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-[#e5e5e5] p-4 hover:border-[#141414] transition-colors"
          >
            <p className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>{stat.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-[#141414]/60 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Sections */}
      <h2 className="text-[10px] uppercase tracking-wider text-[#141414]/60 mb-3">Sections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="border border-[#e5e5e5] p-5 hover:border-[#141414] transition-colors"
          >
            <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>{section.label}</p>
            <p className="text-xs text-[#141414]/60">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
