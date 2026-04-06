import { Router, type IRouter } from "express";
import { db, siteContentTable, servicesTable, galleryItemsTable } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { resolve } from "path";

const router: IRouter = Router();

const REPO_ROOT = resolve(import.meta.dirname, "../../../");
const PUBLIC_DIR = resolve(REPO_ROOT, "artifacts/bytprofit-site/public");
const GITHUB_TOKEN = process.env.GITHUB_PAT ?? "";
const GITHUB_REMOTE = `https://krouzmen:${GITHUB_TOKEN}@github.com/krouzmen/bytprofit.git`;

router.post("/admin/publish", async (_req, res) => {
  try {
    const [content, services, gallery] = await Promise.all([
      db.select().from(siteContentTable),
      db.select().from(servicesTable).orderBy(asc(servicesTable.order)),
      db.select().from(galleryItemsTable).where(eq(galleryItemsTable.active, true)).orderBy(asc(galleryItemsTable.order)),
    ]);

    writeFileSync(
      resolve(PUBLIC_DIR, "content.json"),
      JSON.stringify(content, null, 2),
      "utf-8"
    );
    writeFileSync(
      resolve(PUBLIC_DIR, "services.json"),
      JSON.stringify(services, null, 2),
      "utf-8"
    );
    writeFileSync(
      resolve(PUBLIC_DIR, "gallery.json"),
      JSON.stringify(gallery, null, 2),
      "utf-8"
    );

    const env = {
      ...process.env,
      GIT_ASKPASS: "",
      GIT_TERMINAL_PROMPT: "0",
    };
    const execOpts = { cwd: REPO_ROOT, env };

    execSync('git config user.email "bytprofit@gmail.com"', execOpts);
    execSync('git config user.name "BytProfit Admin"', execOpts);
    execSync("git add artifacts/bytprofit-site/public/content.json artifacts/bytprofit-site/public/services.json artifacts/bytprofit-site/public/gallery.json artifacts/bytprofit-site/public/gallery/", execOpts);

    let committed = false;
    try {
      execSync('git commit -m "content: publish site content and services update"', execOpts);
      committed = true;
    } catch {
      // nothing to commit
    }

    if (committed) {
      execSync(
        `git -c credential.helper='' push ${GITHUB_REMOTE} main`,
        execOpts
      );
    }

    res.json({ success: true, committed, message: committed ? "Published to Netlify — site will update in ~1 minute." : "No changes to publish." });
  } catch (err) {
    console.error("Publish error:", err);
    res.status(500).json({ error: "Publish failed", detail: String(err) });
  }
});

export default router;
