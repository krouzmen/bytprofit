import { Router, type IRouter } from "express";
import { db, siteContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/admin/content", async (_req, res) => {
  try {
    const content = await db.select().from(siteContentTable);
    res.json(content);
  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

router.patch("/admin/content/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const { value } = req.body as { value: string };
    if (typeof value !== "string") {
      res.status(400).json({ error: "value is required" });
      return;
    }

    const [updated] = await db
      .update(siteContentTable)
      .set({ value: value.trim() })
      .where(eq(siteContentTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Content block not found" });
      return;
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating content:", err);
    res.status(500).json({ error: "Failed to update content" });
  }
});

export default router;
