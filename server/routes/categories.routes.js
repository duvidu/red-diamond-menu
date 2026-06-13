import express from "express";
import Category from "../models/Category.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", async (req, res) => {
  const cats = await Category.find().sort({ order: 1, name: 1 });
  res.json(cats);
});

// Admin
router.post("/", requireAdmin, async (req, res) => {
  const { name, order = 0 } = req.body || {};
  if (!name) return res.status(400).json({ message: "Name required" });

  const created = await Category.create({ name, order });
  res.json(created);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
