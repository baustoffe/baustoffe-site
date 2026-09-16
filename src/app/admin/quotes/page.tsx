"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Quote {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  product_id: string | null;
  custom_width_cm: number | null;
  custom_height_cm: number | null;
  color_preference: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["new", "in_review", "quoted", "accepted", "closed"];

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchQuotes() {
    setLoading(true);
    let query = supabase.from("quote_requests").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    if (data) setQuotes(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchQuotes();
  }, [filter]);

  async function updateStatus(id: string, status: string) {
    setSaving(true);
    const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
    setSaving(false);
    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Status updated.");
      fetchQuotes();
    }
  }

  function statusColor(status: string) {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "in_review": return "bg-yellow-100 text-yellow-800";
      case "quoted": return "bg-purple-100 text-purple-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
          Quote Requests
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-[#e5e5e5] px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#141414]"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</option>
          ))}
        </select>
      </div>

      {message && (
        <div className="border border-[#e5e5e5] bg-[#fafafa] p-3 mb-4 text-xs">{message}</div>
      )}

      {loading ? (
        <p className="text-sm text-[#141414]/60">Loading...</p>
      ) : quotes.length === 0 ? (
        <p className="text-sm text-[#141414]/60">No quote requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Date</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Name</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Contact</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Dimensions</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Status</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-b border-[#e5e5e5] hover:bg-[#fafafa]">
                  <td className="p-3 text-xs whitespace-nowrap">
                    {new Date(q.created_at).toLocaleDateString("ro-RO")}
                  </td>
                  <td className="p-3 text-sm font-medium">{q.full_name}</td>
                  <td className="p-3 text-xs">
                    <div>{q.phone}</div>
                    {q.email && <div className="text-[#141414]/60">{q.email}</div>}
                  </td>
                  <td className="p-3 text-xs">
                    {q.custom_width_cm && q.custom_height_cm
                      ? `${q.custom_width_cm}×${q.custom_height_cm} cm`
                      : "—"}
                    {q.color_preference && (
                      <div className="text-[#141414]/60 mt-0.5">{q.color_preference}</div>
                    )}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${statusColor(q.status)}`}>
                      {q.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q.id, e.target.value)}
                      disabled={saving}
                      className="border border-[#e5e5e5] px-2 py-1 text-xs bg-white focus:outline-none focus:border-[#141414]"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.replace("_", " ")}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
