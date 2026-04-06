import { Router, type IRouter } from "express";
import { db, quotesTable, insertQuoteSchema } from "@workspace/db";
import { desc } from "drizzle-orm";
import { Resend } from "resend";

const router: IRouter = Router();

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function buildEmailHtml(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType: string;
  description: string;
  budget?: string | null;
  timeline?: string | null;
  address?: string | null;
}) {
  const row = (label: string, value: string | null | undefined) =>
    value
      ? `<tr><td style="padding:6px 12px;font-weight:bold;color:#555;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#222">${value}</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="background:#e86c2c;padding:24px 32px">
      <h1 style="margin:0;color:#fff;font-size:22px">Nová poptávka — BytProfit</h1>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          ${row("Jméno", `${data.firstName} ${data.lastName}`)}
          ${row("E-mail", data.email)}
          ${row("Telefon", data.phone)}
          ${row("Typ služby", data.serviceType)}
          ${row("Typ nemovitosti", data.propertyType)}
          ${row("Adresa", data.address)}
          ${row("Rozpočet", data.budget)}
          ${row("Termín", data.timeline)}
        </tbody>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:8px;border-left:4px solid #e86c2c">
        <p style="margin:0 0 6px;font-weight:bold;color:#555">Popis prací:</p>
        <p style="margin:0;color:#222;white-space:pre-wrap">${data.description}</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#f0f0f0;font-size:12px;color:#888">
      Tato zpráva byla automaticky odeslána z formuláře na bytprofit.cz
    </div>
  </div>
</body>
</html>`;
}

router.get("/quotes", async (_req, res) => {
  try {
    const quotes = await db.select().from(quotesTable).orderBy(desc(quotesTable.createdAt));
    res.json(quotes);
  } catch (err) {
    console.error("Error fetching quotes:", err);
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

router.post("/quotes", async (req, res) => {
  try {
    const parsed = insertQuoteSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      return;
    }

    const data = parsed.data;
    const [quote] = await db
      .insert(quotesTable)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType,
        propertyType: data.propertyType,
        description: data.description,
        budget: data.budget,
        timeline: data.timeline,
        address: data.address,
        status: "pending",
      })
      .returning();

    const resend = getResend();
    if (resend) {
      try {
        const result = await resend.emails.send({
          from: "BytProfit Web <onboarding@resend.dev>",
          to: "bytprofit@gmail.com",
          replyTo: data.email,
          subject: `Nová poptávka od ${data.firstName} ${data.lastName}`,
          html: buildEmailHtml(data),
        });
        if (result.error) {
          console.error("Email send failed (quote still saved):", result.error);
        } else {
          console.info("Email sent:", result.data?.id);
        }
      } catch (mailErr) {
        console.error("Email send failed (quote still saved):", mailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not set — email not sent");
    }

    res.status(201).json(quote);
  } catch (err) {
    console.error("Error creating quote:", err);
    res.status(500).json({ error: "Failed to create quote" });
  }
});

export default router;
