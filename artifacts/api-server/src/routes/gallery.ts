import { Router, type IRouter } from "express";
import multer from "multer";
import { db, galleryItemsTable } from "@workspace/db";
import { asc, eq } from "drizzle-orm";
import { resolve } from "path";
import { unlinkSync, existsSync } from "fs";

const GALLERY_DIR = resolve(process.cwd(), "artifacts/bytprofit-site/public/gallery");

const storage = multer.diskStorage({
  destination: GALLERY_DIR,
  filename: (_req, file, cb) => {
    const ext = file.originalname.split(".").pop()?.toLowerCase() ?? "jpg";
    const name = `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

const router: IRouter = Router();

router.get("/admin/gallery", async (_req, res) => {
  try {
    const items = await db.select().from(galleryItemsTable).orderBy(asc(galleryItemsTable.order));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.get("/gallery", async (_req, res) => {
  try {
    const items = await db.select().from(galleryItemsTable)
      .where(eq(galleryItemsTable.active, true))
      .orderBy(asc(galleryItemsTable.order));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.post("/admin/gallery/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No image uploaded" });
      return;
    }
    const count = await db.select().from(galleryItemsTable);
    const [item] = await db.insert(galleryItemsTable).values({
      filename: req.file.filename,
      description: (req.body.description as string) ?? "",
      order: count.length,
      active: true,
    }).returning();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.patch("/admin/gallery/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { description, active, order } = req.body as { description?: string; active?: boolean; order?: number };
    const updates: Partial<typeof galleryItemsTable.$inferInsert> = {};
    if (description !== undefined) updates.description = description;
    if (active !== undefined) updates.active = active;
    if (order !== undefined) updates.order = order;
    const [item] = await db.update(galleryItemsTable).set(updates).where(eq(galleryItemsTable.id, id)).returning();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

router.delete("/admin/gallery/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [item] = await db.delete(galleryItemsTable).where(eq(galleryItemsTable.id, id)).returning();
    if (item) {
      const filepath = resolve(GALLERY_DIR, item.filename);
      if (existsSync(filepath)) unlinkSync(filepath);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
