import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import menuRoutes from "./routes/menu.routes.js";

dotenv.config();

const app = express();

const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// CORS must allow cookies
app.use(
  cors({
    origin,
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.json({ ok: true, name: "Red Diamond API" }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;

await connectDB(process.env.MONGO_URI);

// For Vercel serverless, listen is OK (Vercel will handle)
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));

export default app;
