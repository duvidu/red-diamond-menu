import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import MenuItem from "../models/MenuItem.js";
import { requireAdmin } from "../middleware/auth.js";
import { initCloudinary } from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = initCloudinary();

// Public: list menu items, optional category filter
router.get("/", async (req, res) => {
  const { category } = req.query;
  const q = category ? { category } : {};
  const items = await MenuItem.find(q).sort({ category: 1, createdAt: -1 });
  res.json(items);
});

// Admin: create item (with optional image)
router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
  const { name, price, category, description = "", available = "true" } = req.body || {};
  if (!name || !price || !category) return res.status(400).json({ message: "Missing fields" });

  let imageUrl = "";

  if (req.file) {
    imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "red_diamond_menu", resource_type: "image" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  }

  const created = await MenuItem.create({
    name,
    price: Number(price),
    category,
    description,
    available: available === "true",
    imageUrl
  });

  res.json(created);
});

// Admin: update item (optional replace image)
router.put("/:id", requireAdmin, upload.single("image"), async (req, res) => {
  const { name, price, category, description, available } = req.body || {};
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = Number(price);
  if (category !== undefined) item.category = category;
  if (description !== undefined) item.description = description;
  if (available !== undefined) item.available = available === "true";

  if (req.file) {
    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "red_diamond_menu", resource_type: "image" },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
    item.imageUrl = imageUrl;
  }

  await item.save();
  res.json(item);
});

// Admin: delete item
router.delete("/:id", requireAdmin, async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
