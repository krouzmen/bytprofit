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

function block(heading, text) {
  if (!text) return "";
  return `<div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:8px;border-left:4px solid #e86c2c">
    <p style="margin:0 0 6px;font-weight:bold;color:#555">${heading}</p>
    <p style="margin:0;color:#222;white-space:pre-wrap">${text}</p>
  </div>`;
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

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY not set");
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfiguration" }) };
  }

  let d;
  try {
    d = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const formType = d.formType;
  let subject, html, replyTo;

  if (formType === "furniture") {
    replyTo = d.email;
    subject = `🪑 Nová poptávka nábytku od ${d.name || "zákazníka"}`;
    const rows = row("Jméno", d.name) + row("E-mail", d.email) + row("Typ nábytku", d.furnitureType) + row("Rozpočet", d.budget);
    html = wrap("🪑 Nová poptávka nábytku — BytProfit", rows, block("Popis a rozměry:", d.dimensions) + block("Poznámky:", d.message));

  } else if (formType === "quote") {
    replyTo = d.email;
    const name = [d.firstName, d.lastName].filter(Boolean).join(" ") || "zákazníka";
    subject = `Nová poptávka rekonstrukce od ${name}`;
    const rows =
      row("Jméno", name) +
      row("E-mail", d.email) +
      row("Telefon", d.phone) +
      row("Typ služby", d.serviceType) +
      row("Typ nemovitosti", d.propertyType) +
      row("Adresa", d.address) +
      row("Rozpočet", d.budget) +
      row("Termín", d.timeline);
    html = wrap("Nová poptávka rekonstrukce — BytProfit", rows, block("Popis prací:", d.description));

  } else {
    return { statusCode: 400, body: JSON.stringify({ error: "Unknown formType" }) };
  }

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: TO, reply_to: replyTo, subject, html }),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("Resend error:", JSON.stringify(result));
    return { statusCode: 500, body: JSON.stringify({ error: "Email failed" }) };
  }

  console.log("Email sent:", result.id, "form:", formType);
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};
