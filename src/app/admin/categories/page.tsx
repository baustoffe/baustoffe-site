"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  slug: string;
  sort_order: number | null;
  name_ro: string | null;
  name_en: string | null;
  name_de: string | null;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name_ro: "", name_en: "", name_de: "", sort_order: "", slug: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  async function fetchData() {
    setLoading(true);
    const { data } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
    if (data) setCategories(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function startEdit(cat: Category) {
    setEditing(cat.id);
    setForm({
      name_ro: cat.name_ro ?? "",
      name_en: cat.name_en ?? "",
      name_de: cat.name_de ?? "",
      sort_order: String(cat.sort_order ?? 0),
      slug: cat.slug ?? "",
    });
    setMessage(null);
  }

  function cancelEdit() {
    setEditing(null);
    setForm({ name_ro: "", name_en: "", name_de: "", sort_order: "", slug: "" });
    setMessage(null);
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("categories")
      .update({
        name_ro: form.name_ro || null,
        name_en: form.name_en || null,
        name_de: form.name_de || null,
        sort_order: parseInt(form.sort_order) || 0,
        slug: form.slug,
      })
      .eq("id", editing);
    setSaving(false);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Category updated.");
      cancelEdit();
      fetchData();
    }
  }

  async function addCategory() {
    setSaving(true);
    const { error } = await supabase.from("categories").insert({
      name_ro: form.name_ro || null,
      name_en: form.name_en || null,
      name_de: form.name_de || null,
      sort_order: parseInt(form.sort_order) || 0,
      slug: form.slug,
    });
    setSaving(false);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Category added.");
      setForm({ name_ro: "", name_en: "", name_de: "", sort_order: "", slug: "" });
      setShowAdd(false);
      fetchData();
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Category deleted.");
      fetchData();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
          Categories
        </h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-[10px] uppercase tracking-wider border border-[#141414] px-4 py-2 hover:bg-[#141414] hover:text-white transition-colors"
        >
          {showAdd ? "Cancel" : "+ Add Category"}
        </button>
      </div>

      {message && (
        <div className="border border-[#e5e5e5] bg-[#fafafa] p-3 mb-4 text-xs">{message}</div>
      )}

      {showAdd && (
        <div className="border border-[#e5e5e5] p-5 mb-6">
          <h2 className="text-[10px] uppercase tracking-wider text-[#141414]/60 mb-4">Add New Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Name (RO)</label>
              <input type="text" value={form.name_ro} onChange={(e) => setForm({ ...form, name_ro: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Name (EN)</label>
              <input type="text" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Name (DE)</label>
              <input type="text" value={form.name_de} onChange={(e) => setForm({ ...form, name_de: e.target.value })} className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]" />
            </div>
          </div>
          <button
            onClick={addCategory}
            disabled={saving || !form.slug}
            className="mt-4 text-[10px] uppercase tracking-wider border border-[#141414] px-5 py-2 bg-[#141414] text-white hover:bg-black transition-colors disabled:opacity-40"
          >
            {saving ? "Saving..." : "Add Category"}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[#141414]/60">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-sm text-[#141414]/60">No categories yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Order</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Slug</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Name (RO)</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Name (EN)</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Name (DE)</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-[#e5e5e5] hover:bg-[#fafafa]">
                  {editing === cat.id ? (
                    <>
                      <td className="p-3"><input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-16" /></td>
                      <td className="p-3"><input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3"><input type="text" value={form.name_ro} onChange={(e) => setForm({ ...form, name_ro: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3"><input type="text" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3"><input type="text" value={form.name_de} onChange={(e) => setForm({ ...form, name_de: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3 whitespace-nowrap">
                        <button onClick={saveEdit} disabled={saving} className="text-[10px] uppercase tracking-wider text-green-700 hover:underline mr-2">{saving ? "..." : "Save"}</button>
                        <button onClick={cancelEdit} className="text-[10px] uppercase tracking-wider text-[#141414]/60 hover:underline">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 text-sm">{cat.sort_order ?? 0}</td>
                      <td className="p-3 text-xs font-mono">{cat.slug}</td>
                      <td className="p-3 text-sm font-medium">{cat.name_ro ?? "—"}</td>
                      <td className="p-3 text-sm">{cat.name_en ?? "—"}</td>
                      <td className="p-3 text-sm">{cat.name_de ?? "—"}</td>
                      <td className="p-3 whitespace-nowrap">
                        <button onClick={() => startEdit(cat)} className="text-[10px] uppercase tracking-wider text-[#141414] hover:underline mr-2">Edit</button>
                        <button onClick={() => deleteCategory(cat.id)} className="text-[10px] uppercase tracking-wider text-red-600 hover:underline">Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
