import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { checkAntiSpam } from "../lib/antispam";

const router: IRouter = Router();

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  furnitureType: string;
  dimensions: string;
  budget?: string;
  message?: string;
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
      <h1 style="margin:0;color:#fff;font-size:22px">🪑 Nová poptávka nábytku — BytProfit</h1>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          ${row("Jméno", data.name)}
          ${row("E-mail", data.email)}
          ${row("Typ nábytku", data.furnitureType)}
          ${row("Rozpočet", data.budget)}
        </tbody>
      </table>
      <div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:8px;border-left:4px solid #e86c2c">
        <p style="margin:0 0 6px;font-weight:bold;color:#555">Popis a rozměry:</p>
        <p style="margin:0;color:#222;white-space:pre-wrap">${data.dimensions}</p>
      </div>
      ${data.message ? `
      <div style="margin-top:16px;padding:16px;background:#f9f9f9;border-radius:8px;border-left:4px solid #bbb">
        <p style="margin:0 0 6px;font-weight:bold;color:#555">Poznámky:</p>
        <p style="margin:0;color:#222;white-space:pre-wrap">${data.message}</p>
      </div>` : ""}
    </div>
    <div style="padding:16px 32px;background:#f0f0f0;font-size:12px;color:#888">
      Tato zpráva byla automaticky odeslána z formuláře na bytprofit.cz
    </div>
  </div>
</body>
</html>`;
}

router.post("/furniture-quotes", async (req, res) => {
  try {
    const spam = checkAntiSpam(req);
    if (!spam.ok) {
      if (spam.silent) {
        res.status(200).json({ ok: true });
        return;
      }
      res.status(spam.status).json({ error: spam.error });
      return;
    }

    const { name, email, furnitureType, dimensions, budget, message } = req.body as {
      name?: string;
      email?: string;
      furnitureType?: string;
      dimensions?: string;
      budget?: string;
      message?: string;
    };

    if (!name || !email || !furnitureType || !dimensions) {
      res.status(400).json({ error: "Chybí povinná pole (name, email, furnitureType, dimensions)" });
      return;
    }

    const resend = getResend();
    if (resend) {
      try {
        const result = await resend.emails.send({
          from: "BytProfit Web <onboarding@resend.dev>",
          to: "bytprofit@gmail.com",
          replyTo: email,
          subject: `🪑 Nová poptávka nábytku od ${name}`,
          html: buildEmailHtml({ name, email, furnitureType, dimensions, budget, message }),
        });
        if (result.error) {
          console.error("Furniture quote email failed:", result.error);
        } else {
          console.info("Furniture quote email sent:", result.data?.id);
        }
      } catch (mailErr) {
        console.error("Furniture quote email exception:", mailErr);
      }
    } else {
      console.warn("RESEND_API_KEY not set — furniture quote email not sent");
    }

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Error handling furniture quote:", err);
    res.status(500).json({ error: "Failed to process furniture quote" });
  }
});

export default router;
