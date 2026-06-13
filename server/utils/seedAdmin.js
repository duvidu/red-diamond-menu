import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();
await connectDB(process.env.MONGO_URI);

const email = process.env.ADMIN_SEED_EMAIL;
const password = process.env.ADMIN_SEED_PASSWORD;

if (!email || !password) {
  console.log("❌ ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD missing");
  process.exit(1);
}

const exist = await Admin.findOne({ email: email.toLowerCase() });
if (exist) {
  console.log("✅ Admin already exists:", exist.email);
  process.exit(0);
}

const passwordHash = await bcrypt.hash(password, 10);
await Admin.create({ email: email.toLowerCase(), passwordHash });

console.log("✅ Admin created:", email);
process.exit(0);
