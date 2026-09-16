"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Category {
  id: string;
  name_ro: string;
  slug: string;
}

interface Product {
  id: string;
  base_name_ro: string;
  slug: string;
  base_price_ron: number;
  material: string | null;
  glass_type: string | null;
  is_double: boolean;
  status: string;
  description_ro: string | null;
  category_id: string | null;
  code: string;
}

const emptyProduct = {
  base_name_ro: "",
  slug: "",
  category_id: "",
  base_price_ron: "",
  material: "",
  glass_type: "",
  is_double: false,
  description_ro: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id, name_ro, slug").order("sort_order", { ascending: true }),
    ]);
    if (productsData) setProducts(productsData);
    if (categoriesData) setCategories(categoriesData);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function startEdit(product: Product) {
    setEditing(product.id);
    setForm({
      base_name_ro: product.base_name_ro,
      slug: product.slug,
      category_id: product.category_id ?? "",
      base_price_ron: String(product.base_price_ron),
      material: product.material ?? "",
      glass_type: product.glass_type ?? "",
      is_double: product.is_double,
      description_ro: product.description_ro ?? "",
    });
    setMessage(null);
  }

  function cancelEdit() {
    setEditing(null);
    setForm(emptyProduct);
    setMessage(null);
  }

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    const { error } = await supabase
      .from("products")
      .update({
        base_name_ro: form.base_name_ro,
        slug: form.slug,
        category_id: form.category_id || null,
        base_price_ron: parseFloat(form.base_price_ron) || 0,
        material: form.material || null,
        glass_type: form.glass_type || null,
        is_double: form.is_double,
        description_ro: form.description_ro || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", editing);
    setSaving(false);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Product updated.");
      setEditing(null);
      setForm(emptyProduct);
      fetchData();
    }
  }

  async function addProduct() {
    setSaving(true);
    const code = "BB-" + Date.now().toString(36).toUpperCase();
    const { error } = await supabase.from("products").insert({
      code,
      base_name_ro: form.base_name_ro,
      slug: form.slug,
      category_id: form.category_id || null,
      base_price_ron: parseFloat(form.base_price_ron) || 0,
      material: form.material || null,
      glass_type: form.glass_type || null,
      is_double: form.is_double,
      description_ro: form.description_ro || null,
      status: "active",
    });
    setSaving(false);
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Product added.");
      setForm(emptyProduct);
      setShowAdd(false);
      fetchData();
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Product deleted.");
      fetchData();
    }
  }

  function getCategoryName(categoryId: string | null) {
    if (!categoryId) return "—";
    return categories.find((c) => c.id === categoryId)?.name_ro ?? "—";
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
          Products
        </h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-[10px] uppercase tracking-wider border border-[#141414] px-4 py-2 hover:bg-[#141414] hover:text-white transition-colors"
        >
          {showAdd ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {message && (
        <div className="border border-[#e5e5e5] bg-[#fafafa] p-3 mb-4 text-xs">{message}</div>
      )}

      {/* Add Product Form */}
      {showAdd && (
        <div className="border border-[#e5e5e5] p-5 mb-6">
          <h2 className="text-[10px] uppercase tracking-wider text-[#141414]/60 mb-4">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Name (RO)</label>
              <input
                type="text"
                value={form.base_name_ro}
                onChange={(e) => setForm({ ...form, base_name_ro: e.target.value })}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414] bg-white"
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name_ro}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Price (RON)</label>
              <input
                type="number"
                value={form.base_price_ron}
                onChange={(e) => setForm({ ...form, base_price_ron: e.target.value })}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Material</label>
              <input
                type="text"
                value={form.material}
                onChange={(e) => setForm({ ...form, material: e.target.value })}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Glass Type</label>
              <input
                type="text"
                value={form.glass_type}
                onChange={(e) => setForm({ ...form, glass_type: e.target.value })}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#141414]/60">
                <input
                  type="checkbox"
                  checked={form.is_double}
                  onChange={(e) => setForm({ ...form, is_double: e.target.checked })}
                />
                Double-sided
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-wider text-[#141414]/60 mb-1">Description (RO)</label>
              <textarea
                value={form.description_ro}
                onChange={(e) => setForm({ ...form, description_ro: e.target.value })}
                rows={3}
                className="w-full border border-[#e5e5e5] px-3 py-2 text-sm focus:outline-none focus:border-[#141414]"
              />
            </div>
          </div>
          <button
            onClick={addProduct}
            disabled={saving || !form.base_name_ro || !form.slug}
            className="mt-4 text-[10px] uppercase tracking-wider border border-[#141414] px-5 py-2 bg-[#141414] text-white hover:bg-black transition-colors disabled:opacity-40"
          >
            {saving ? "Saving..." : "Add Product"}
          </button>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <p className="text-sm text-[#141414]/60">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-[#141414]/60">No products yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e5e5e5]">
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Code</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Name</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Price</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Material</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Glass</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Status</th>
                <th className="text-left text-[10px] uppercase tracking-wider text-[#141414]/60 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#e5e5e5] hover:bg-[#fafafa]">
                  {editing === p.id ? (
                    <>
                      <td className="p-3 text-xs">{p.code}</td>
                      <td className="p-3"><input type="text" value={form.base_name_ro} onChange={(e) => setForm({ ...form, base_name_ro: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3"><input type="number" value={form.base_price_ron} onChange={(e) => setForm({ ...form, base_price_ron: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-20" /></td>
                      <td className="p-3"><input type="text" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3"><input type="text" value={form.glass_type} onChange={(e) => setForm({ ...form, glass_type: e.target.value })} className="border border-[#e5e5e5] px-2 py-1 text-xs w-full" /></td>
                      <td className="p-3">
                        <select value={form.is_double ? "active" : "active"} disabled className="text-xs">
                          <option>{p.status}</option>
                        </select>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <button onClick={saveEdit} disabled={saving} className="text-[10px] uppercase tracking-wider text-green-700 hover:underline mr-2">{saving ? "..." : "Save"}</button>
                        <button onClick={cancelEdit} className="text-[10px] uppercase tracking-wider text-[#141414]/60 hover:underline">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 text-xs font-mono">{p.code}</td>
                      <td className="p-3 text-sm font-medium">{p.base_name_ro}</td>
                      <td className="p-3 text-sm">{p.base_price_ron} RON</td>
                      <td className="p-3 text-sm">{p.material ?? "—"}</td>
                      <td className="p-3 text-sm">{p.glass_type ?? "—"}</td>
                      <td className="p-3">
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${p.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <button onClick={() => startEdit(p)} className="text-[10px] uppercase tracking-wider text-[#141414] hover:underline mr-2">Edit</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-[10px] uppercase tracking-wider text-red-600 hover:underline">Delete</button>
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
