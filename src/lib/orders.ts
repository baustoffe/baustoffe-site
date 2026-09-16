"use server";

import { supabase } from "./supabase";
import type { CartItem } from "./types";

export interface OrderInput {
  customer_type: "individual" | "company";
  full_name: string;
  phone: string;
  email?: string;
  delivery_method: "delivery" | "pickup";
  address_street?: string;
  address_city?: string;
  address_county?: string;
  address_postal?: string;
  billing_different: boolean;
  billing_name?: string;
  billing_cui?: string;
  billing_reg_com?: string;
  billing_address_street?: string;
  billing_address_city?: string;
  billing_address_county?: string;
  billing_address_postal?: string;
  notes?: string;
  gdpr_consent: boolean;
  gdpr_consent_at: string;
  delivery_fee_ron: number;
  total_ron: number;
  items: CartItem[];
}

/**
 * Generate order number in format BB-YYYY-NNNNNN
 */
function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
  return `BB-${year}-${rand}`;
}

/**
 * Insert order + items into Supabase.
 * Returns { success, orderNumber, orderId } or { success: false, error }.
 */
export async function createOrder(input: OrderInput) {
  try {
    const orderNumber = generateOrderNumber();

    // Insert order
    const { data: orderData, error: orderErr } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_type: input.customer_type,
        full_name: input.full_name,
        phone: input.phone,
        email: input.email || null,
        delivery_method: input.delivery_method,
        address_street: input.address_street || null,
        address_city: input.address_city || null,
        address_county: input.address_county || null,
        address_postal: input.address_postal || null,
        billing_different: input.billing_different,
        billing_name: input.billing_name || null,
        billing_cui: input.billing_cui || null,
        billing_reg_com: input.billing_reg_com || null,
        billing_address_street: input.billing_address_street || null,
        billing_address_city: input.billing_address_city || null,
        billing_address_county: input.billing_address_county || null,
        billing_address_postal: input.billing_address_postal || null,
        notes: input.notes || null,
        delivery_fee_ron: input.delivery_fee_ron,
        total_ron: input.total_ron,
        gdpr_consent: input.gdpr_consent,
        gdpr_consent_at: input.gdpr_consent_at,
      })
      .select("id")
      .single();

    if (orderErr) {
      console.error("[createOrder] insert order failed:", orderErr);
      return { success: false, error: orderErr.message };
    }

    // Insert order items
    const itemsToInsert = input.items.map((item) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      size_label: item.size,
      quantity: item.quantity,
      unit_price_ron: item.unit_price_ron,
      line_total_ron: item.quantity * item.unit_price_ron,
    }));

    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsErr) {
      console.error("[createOrder] insert items failed:", itemsErr);
      return { success: false, error: itemsErr.message };
    }

    return { success: true, orderNumber, orderId: orderData.id };
  } catch (err) {
    console.error("[createOrder] exception:", err);
    return { success: false, error: "exception" };
  }
}

/**
 * Insert a contact message.
 */
export async function insertContactMessage(input: {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const { error } = await supabase.from("contact_messages").insert(input);
  if (error) {
    console.error("[insertContactMessage]", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Insert a quote request.
 */
export async function insertQuoteRequest(input: {
  full_name: string;
  phone: string;
  email?: string;
  product_id?: string;
  custom_width_cm?: number;
  custom_height_cm?: number;
  color_preference?: string;
  message?: string;
}) {
  const { error } = await supabase.from("quote_requests").insert(input);
  if (error) {
    console.error("[insertQuoteRequest]", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
