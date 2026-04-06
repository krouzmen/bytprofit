import { Router, type IRouter } from "express";
import { db, servicesTable } from "@workspace/db";
import { asc, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/services", async (_req, res) => {
  try {
    const services = await db
      .select()
      .from(servicesTable)
      .where(eq(servicesTable.active, true))
      .orderBy(asc(servicesTable.order));
    res.json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.get("/admin/services", async (_req, res) => {
  try {
    const services = await db
      .select()
      .from(servicesTable)
      .orderBy(asc(servicesTable.order));
    res.json(services);
  } catch (err) {
    console.error("Error fetching all services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

router.patch("/admin/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }

    const { active, featured, order, name, shortDescription, description, icon } = req.body as {
      active?: boolean;
      featured?: boolean;
      order?: number;
      name?: string;
      shortDescription?: string;
      description?: string;
      icon?: string;
    };

    const updateData: Partial<typeof servicesTable.$inferInsert> = {};
    if (typeof active === "boolean") updateData.active = active;
    if (typeof featured === "boolean") updateData.featured = featured;
    if (typeof order === "number") updateData.order = order;
    if (typeof name === "string" && name.trim()) updateData.name = name.trim();
    if (typeof shortDescription === "string") updateData.shortDescription = shortDescription.trim();
    if (typeof description === "string") updateData.description = description.trim();
    if (typeof icon === "string" && icon.trim()) updateData.icon = icon.trim();

    const [updated] = await db
      .update(servicesTable)
      .set(updateData)
      .where(eq(servicesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Service not found" });
      return;
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ error: "Failed to update service" });
  }
});

export default router;
