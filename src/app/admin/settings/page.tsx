"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const FIELDS = [
  { key: "company_name", label: "Company Name", type: "text" },
  { key: "cui", label: "CUI", type: "text" },
  { key: "reg_com", label: "Reg. Com.", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "contact_name", label: "Contact Name", type: "text" },
  { key: "contact_phone", label: "Contact Phone", type: "text" },
  { key: "pickup_address", label: "Pickup Address", type: "text" },
  { key: "delivery_fee_ron", label: "Delivery Fee (RON)", type: "number" },
  { key: "contact_email", label: "Contact Email", type: "email" },
  { key: "orders_email", label: "Orders Email", type: "email" },
  { key: "offers_email", label: "Offers Email", type: "email" },
  { key: "gtm_container_id", label: "GTM Container ID", type: "text" },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from("site_settings").select("*").single();
      if (data) {
        const s: Record<string, string> = {};
        for (const field of FIELDS) {
          s[field.key] = data[field.key] != null ? String(data[field.key]) : "";
        }
        setSettings(s);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  function handleChange(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    const payload: Record<string, string | number | null> = {};
    for (const field of FIELDS) {
      const val = settings[field.key]?.trim() || "";
      if (field.type === "number") {
        payload[field.key] = val ? parseFloat(val) : null;
      } else {
        payload[field.key] = val || null;
      }
    }
    const { error } = await supabase.from("site_settings").upsert({ id: 1, ...payload });
    setSaving(false);
    if (error) setMessage("Error: " + error.message);
    else setMessage("Settings saved.");
  }

  if (loading) return <p className="text-sm text-[#141414]/60">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
        Settings
      </h1>

      {message && (
        <div className="border border-[#e5e5e5] bg-[#fafafa] p-3 mb-4 text-xs">{message}</div>
      )}

      <div className="border border-[#e5e5e5] p-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FIELDS.map((field) => (
            <div key={field.key} className={field.key === "address" || field.key === "pickup_address" ? "md:col-span-2" : ""}>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                value={settings[field.key] ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="mt-6 text-[10px] uppercase tracking-wider border border-[#141414] px-6 py-2.5 bg-[#141414] text-white hover:bg-black transition-colors disabled:opacity-40"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
