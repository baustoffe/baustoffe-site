"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["new", "read", "replied", "archived"];

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Message | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchMessages() {
    setLoading(true);
    let query = supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    if (data) setMessages(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages();
    setSelected(null);
  }, [filter]);

  async function updateStatus(id: string, status: string) {
    setSaving(true);
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id);
    setSaving(false);
    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Status updated.");
      if (selected?.id === id) setSelected({ ...selected, status });
      fetchMessages();
    }
  }

  function statusColor(status: string) {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "read": return "bg-yellow-100 text-yellow-800";
      case "replied": return "bg-purple-100 text-purple-800";
      case "archived": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
          Contact Messages
        </h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-[#e5e5e5] px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#141414]"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {message && (
        <div className="border border-[#e5e5e5] bg-[#fafafa] p-3 mb-4 text-xs">{message}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message List */}
        <div>
          {loading ? (
            <p className="text-sm text-[#141414]/60">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-[#141414]/60">No messages found.</p>
          ) : (
            <div className="border border-[#e5e5e5] divide-y divide-[#e5e5e5]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`p-4 cursor-pointer transition-colors ${selected?.id === msg.id ? "bg-[#fafafa]" : "hover:bg-[#fafafa]"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{msg.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${statusColor(msg.status)}`}>
                      {msg.status}
                    </span>
                  </div>
                  {msg.subject && <p className="text-xs text-[#141414]/60 mb-1">{msg.subject}</p>}
                  <p className="text-[10px] text-[#141414]/40">
                    {new Date(msg.created_at).toLocaleDateString("ro-RO")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div>
          {selected ? (
            <div className="border border-[#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">{selected.name}</h2>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  disabled={saving}
                  className="border border-[#e5e5e5] px-2 py-1 text-xs bg-white focus:outline-none focus:border-[#141414]"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Email</p>
                    <p>{selected.email ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Phone</p>
                    <p>{selected.phone ?? "—"}</p>
                  </div>
                </div>

                {selected.subject && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Subject</p>
                    <p className="font-medium mt-1">{selected.subject}</p>
                  </div>
                )}

                {selected.message && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Message</p>
                    <p className="mt-1 whitespace-pre-wrap">{selected.message}</p>
                  </div>
                )}

                <p className="text-[10px] text-[#141414]/40">
                  Received {new Date(selected.created_at).toLocaleString("ro-RO")}
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-[#e5e5e5] p-5 text-center text-sm text-[#141414]/60">
              Select a message to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
