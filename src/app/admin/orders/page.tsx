"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  order_number: string;
  full_name: string;
  phone: string;
  email: string | null;
  total_ron: number | null;
  status: string;
  created_at: string;
  delivery_method: string | null;
  notes: string | null;
}

interface OrderItem {
  id: string;
  product_id: string | null;
  size_label: string | null;
  quantity: number;
  unit_price_ron: number;
  line_total_ron: number;
}

const STATUS_OPTIONS = ["new", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchOrders() {
    setLoading(true);
    let query = supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    if (data) setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
    setSelected(null);
  }, [filter]);

  async function viewOrder(order: Order) {
    setSelected(order);
    setItemsLoading(true);
    const { data } = await supabase.from("order_items").select("*").eq("order_id", order.id);
    if (data) setItems(data);
    setItemsLoading(false);
  }

  async function updateStatus(orderId: string, status: string) {
    setSaving(true);
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    setSaving(false);
    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Status updated.");
      if (selected?.id === orderId) setSelected({ ...selected, status });
      fetchOrders();
    }
  }

  function statusColor(status: string) {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "confirmed": return "bg-yellow-100 text-yellow-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#141414" }}>
          Orders
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
        {/* Order List */}
        <div>
          {loading ? (
            <p className="text-sm text-[#141414]/60">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-[#141414]/60">No orders found.</p>
          ) : (
            <div className="border border-[#e5e5e5] divide-y divide-[#e5e5e5]">
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => viewOrder(order)}
                  className={`p-4 cursor-pointer transition-colors ${selected?.id === order.id ? "bg-[#fafafa]" : "hover:bg-[#fafafa]"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold font-mono">{order.order_number}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#141414]/60">{order.full_name}</span>
                    <span className="text-sm font-medium">{order.total_ron ?? 0} RON</span>
                  </div>
                  <p className="text-[10px] text-[#141414]/40 mt-1">
                    {new Date(order.created_at).toLocaleDateString("ro-RO")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Detail */}
        <div>
          {selected ? (
            <div className="border border-[#e5e5e5] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">Order {selected.order_number}</h2>
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
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Customer</p>
                    <p className="font-medium">{selected.full_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Phone</p>
                    <p>{selected.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Email</p>
                    <p>{selected.email ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Delivery</p>
                    <p>{selected.delivery_method ?? "—"}</p>
                  </div>
                </div>

                {selected.notes && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#141414]/60">Notes</p>
                    <p className="mt-1">{selected.notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#141414]/60 mb-2">Items</p>
                  {itemsLoading ? (
                    <p>Loading items...</p>
                  ) : items.length === 0 ? (
                    <p className="text-[#141414]/60">No items.</p>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs border-t border-[#e5e5e5] pt-2">
                          <span>
                            {item.size_label ?? "—"} × {item.quantity}
                          </span>
                          <span className="font-medium">{item.line_total_ron} RON</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-[#e5e5e5] pt-3 flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>{selected.total_ron ?? 0} RON</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-[#e5e5e5] p-5 text-center text-sm text-[#141414]/60">
              Select an order to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
