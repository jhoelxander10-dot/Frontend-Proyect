import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { env } from "../config/env.js";

export interface AuthenticatedRequest extends Request {
  auth?: { userId: string; role: "ADMIN" | "USUARIO" };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    res.status(401).json({ message: "Debes iniciar sesión." });
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (
      typeof payload === "string" ||
      typeof payload.sub !== "string" ||
      !mongoose.isValidObjectId(payload.sub) ||
      (payload.role !== "ADMIN" && payload.role !== "USUARIO")
    ) {
      res.status(401).json({ message: "Sesión inválida." });
      return;
    }

    req.auth = { userId: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ message: "La sesión venció o no es válida." });
  }
}
