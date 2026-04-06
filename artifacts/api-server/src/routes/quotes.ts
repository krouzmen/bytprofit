import { Router, type IRouter } from "express";
import { db, quotesTable, insertQuoteSchema } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

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

    res.status(201).json(quote);
  } catch (err) {
    console.error("Error creating quote:", err);
    res.status(500).json({ error: "Failed to create quote" });
  }
});

export default router;
