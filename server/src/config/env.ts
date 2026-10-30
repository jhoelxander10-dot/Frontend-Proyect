import "dotenv/config";
import { z } from "zod";

// Support both variable names used by earlier versions of this project.
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must contain at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  CLIENT_ORIGIN: z.string().url().optional(),
  CLIENT_ORIGINS: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!mongoUri) {
  console.error("Missing MongoDB connection string. Set MONGODB_URI (or MONGO_URI).");
  throw new Error("MongoDB connection string is not configured.");
}

if (!parsed.success) {
  console.error("Invalid server environment:", parsed.error.flatten().fieldErrors);
  throw new Error("Server environment configuration is invalid.");
}

const configuredOrigins = parsed.data.CLIENT_ORIGINS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = {
  ...parsed.data,
  MONGODB_URI: mongoUri,
  CLIENT_ORIGINS: configuredOrigins?.length
    ? configuredOrigins
    : [parsed.data.CLIENT_ORIGIN || "http://localhost:5173"],
};
