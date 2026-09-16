/**
 * Send transactional email via Brevo (Sendinblue) API.
 * Returns { success: true } or { success: false, error }.
 * Never throws — safe to call from server actions/route handlers.
 */

interface BrevoEmail {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  sender?: { email: string; name?: string };
}

export async function sendTransactionalEmail(
  email: BrevoEmail,
  brevoApiKey?: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = brevoApiKey || process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[Brevo] No API key — skipping email send");
    return { success: false, error: "no_api_key" };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        to: email.to,
        subject: email.subject,
        htmlContent: email.htmlContent,
        sender: email.sender || {
          email: process.env.BREVO_SENDER_EMAIL || "no-reply@baustoffe.ro",
          name: process.env.BREVO_SENDER_NAME || "Baustoffe",
        },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Brevo] Send failed: ${res.status} ${body}`);
      return { success: false, error: `http_${res.status}` };
    }

    return { success: true };
  } catch (err) {
    console.error("[Brevo] Exception:", err);
    return { success: false, error: "exception" };
  }
}

/**
 * Build order confirmation HTML for Brevo.
 */
export function buildOrderEmail(params: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMethod: string;
  address?: string;
  items: { name: string; color: string; size: string; qty: string; price: string }[];
  deliveryFee: number;
  total: number;
}): string {
  const itemsHtml = params.items
    .map(
      (i) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${i.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${i.color}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${i.size}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.qty}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${i.price} Lei</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="font-family:'Space Grotesk',sans-serif;background:#fafafa;padding:40px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;padding:40px;">
    <h1 style="font-size:24px;margin:0 0 20px;">Baustoffe</h1>
    <p style="color:#141414;">Comanda <strong>${params.orderNumber}</strong> a fost înregistrată.</p>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
      <thead>
        <tr style="border-bottom:2px solid #141414;">
          <th style="padding:8px;text-align:left;">Produs</th>
          <th style="padding:8px;text-align:left;">Culoare</th>
          <th style="padding:8px;text-align:left;">Dimensiune</th>
          <th style="padding:8px;text-align:center;">Cantitate</th>
          <th style="padding:8px;text-align:right;">Preț</th>
        </tr>
      </thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <div style="text-align:right;font-size:14px;">
      <p>Subtotal: ${params.total - params.deliveryFee} Lei</p>
      <p>Livrare: ${params.deliveryFee} Lei</p>
      <p style="font-size:18px;font-weight:bold;">Total: ${params.total} Lei</p>
    </div>
    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <p style="color:#141414;opacity:0.7;font-size:13px;">Te vom contacta telefonic pentru confirmare.</p>
  </div>
</body>
</html>`;
}
