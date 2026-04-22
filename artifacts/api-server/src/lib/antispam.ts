import type { Request } from "express";

const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MIN_FORM_TIME_MS = 3000;

const ipBuckets = new Map<string, number[]>();

function getIp(req: Request): string {
  const fwd = (req.headers["x-forwarded-for"] as string | undefined) || "";
  const first = fwd.split(",")[0]?.trim();
  return first || req.ip || req.socket?.remoteAddress || "unknown";
}

export type AntiSpamResult =
  | { ok: true }
  | { ok: false; status: number; error: string; silent?: boolean };

export function checkAntiSpam(req: Request): AntiSpamResult {
  const ip = getIp(req);
  const body = req.body as Record<string, unknown>;

  // Rate limit
  const now = Date.now();
  const arr = (ipBuckets.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) {
    ipBuckets.set(ip, arr);
    console.warn("Rate limit hit for IP:", ip);
    return {
      ok: false,
      status: 429,
      error: "Příliš mnoho požadavků. Zkuste to prosím za hodinu znovu.",
    };
  }

  // Honeypot
  const website = body.website;
  if (typeof website === "string" && website.trim() !== "") {
    console.warn("Honeypot triggered, IP:", ip, "value:", website);
    return { ok: false, status: 200, error: "ok", silent: true };
  }

  // Time check
  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FORM_TIME_MS) {
    console.warn("Time check failed, IP:", ip, "elapsed:", elapsed);
    return { ok: false, status: 200, error: "ok", silent: true };
  }

  // Math captcha
  const a = Number(body.mathA);
  const b = Number(body.mathB);
  const ans = Number(body.mathAnswer);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(ans) || a + b !== ans) {
    console.warn("Math captcha failed, IP:", ip);
    return {
      ok: false,
      status: 400,
      error: "Nesprávná odpověď na kontrolní otázku. Zkuste prosím znovu.",
    };
  }

  // Record this request only after passing
  arr.push(now);
  ipBuckets.set(ip, arr);

  if (ipBuckets.size > 5000) {
    for (const [k, v] of ipBuckets) {
      const fresh = v.filter((t) => now - t < RATE_WINDOW_MS);
      if (fresh.length === 0) ipBuckets.delete(k);
      else ipBuckets.set(k, fresh);
    }
  }

  return { ok: true };
}
