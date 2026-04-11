const RESEND_API = "https://api.resend.com/emails";
const TO = "bytprofit@gmail.com";
const FROM = "BytProfit Web <onboarding@resend.dev>";

function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 12px;font-weight:bold;color:#555;white-space:nowrap">${label}</td>
    <td style="padding:6px 12px;color:#222">${value}</td>
  </tr>`;
}

function wrap(title, tableRows, blocks) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="background:#e86c2c;padding:24px 32px">
      <h1 style="margin:0;color:#fff;font-size:22px">${title}</h1>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse"><tbody>${tableRows}</tbody></table>
      ${blocks || ""}
    </div>
    <div style="padding:16px 32px;background:#f0f0f0;font-size:12px;color:#888">
      Tato zpráva byla automaticky odeslána z formuláře na bytprofit.cz
    </div>
  </div>
</body></html>`;
}

function block(heading, text) {
  if (!text) return "";
  return `<div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:8px;border-left:4px solid #e86c2c">
    <p style="margin:0 0 6px;font-weight:bold;color:#555">${heading}</p>
    <p style="margin:0;color:#222;white-space:pre-wrap">${text}</p>
  </div>`;
}

function buildFurnitureEmail(d) {
  const rows = row("Jméno", d.name) + row("E-mail", d.email) + row("Typ nábytku", d.furnitureType) + row("Rozpočet", d.budget);
  return wrap("🪑 Nová poptávka nábytku — BytProfit", rows, block("Popis a rozměry:", d.dimensions) + block("Poznámky:", d.message));
}

function buildQuoteEmail(d) {
  const name = [d.firstName, d.lastName].filter(Boolean).join(" ");
  const rows =
    row("Jméno", name) +
    row("E-mail", d.email) +
    row("Telefon", d.phone) +
    row("Typ služby", d.serviceType) +
    row("Typ nemovitosti", d.propertyType) +
    row("Adresa", d.address) +
    row("Rozpočet", d.budget) +
    row("Termín", d.timeline);
  return wrap("Nová poptávka rekonstrukce — BytProfit", rows, block("Popis prací:", d.description));
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || {};
    const formName = payload.form_name || "";
    const d = payload.data || {};
    const replyTo = d.email || payload.email || TO;

    let subject, html;

    if (formName === "poptavka-nabytku") {
      subject = `🪑 Nová poptávka nábytku od ${d.name || "zákazníka"}`;
      html = buildFurnitureEmail(d);
    } else if (formName === "poptavka") {
      const name = [d.firstName, d.lastName].filter(Boolean).join(" ") || "zákazníka";
      subject = `Nová poptávka rekonstrukce od ${name}`;
      html = buildQuoteEmail(d);
    } else {
      return { statusCode: 200, body: `Unknown form "${formName}", skipping` };
    }

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("RESEND_API_KEY is not set in Netlify environment variables");
      return { statusCode: 500, body: "Missing RESEND_API_KEY" };
    }

    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: TO, reply_to: replyTo, subject, html }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return { statusCode: 500, body: "Resend error" };
    }

    const result = await res.json();
    console.log("Email sent:", result.id);
    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("submission-created error:", err);
    return { statusCode: 500, body: "Internal error" };
  }
};
