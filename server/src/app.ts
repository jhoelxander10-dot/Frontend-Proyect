import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { env } from "./config/env.js";
import { authRouter } from "./routes/auth.routes.js";
import { tasksRouter } from "./routes/tasks.routes.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: env.CLIENT_ORIGIN,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "20kb" }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiados intentos. Espera unos minutos e inténtalo otra vez." },
});

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "MiColegio API" }));
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/tasks", tasksRouter);

app.use((_req, res) => res.status(404).json({ message: "Ruta no encontrada." }));

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error && typeof error === "object" && "code" in error && error.code === 11000) {
    res.status(409).json({ message: "Ese carnet ya tiene una cuenta." });
    return;
  }
  console.error("API request failed:", error);
  res.status(500).json({ message: "Ocurrió un error interno." });
};
app.use(errorHandler);
