import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import { UserModel } from "../models/User.js";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";

export const authRouter = Router();

const credentialsSchema = z.object({
  carnet: z.string().trim().min(1).max(30),
  password: z.string().min(6).max(128),
});

const registerSchema = credentialsSchema.extend({
  name: z.string().trim().min(2).max(100),
});

function createToken(userId: string, role: "ADMIN" | "USUARIO") {
  return jwt.sign({ role }, env.JWT_SECRET, {
    subject: userId,
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

function publicUser(user: { _id: unknown; name: string; carnet: string; course: string; role: "ADMIN" | "USUARIO" }) {
  return {
    id: String(user._id),
    name: user.name,
    carnet: user.carnet,
    curso: user.course,
    role: user.role,
  };
}

authRouter.post("/register", async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Revisa el nombre, carnet y contraseña (mínimo 6 caracteres)." });
      return;
    }

    const carnet = parsed.data.carnet;
    if (await UserModel.exists({ carnet })) {
      res.status(409).json({ message: "Ese carnet ya tiene una cuenta." });
      return;
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    // Public registration can only create student accounts, never administrators.
    const user = await UserModel.create({
      name: parsed.data.name,
      carnet,
      passwordHash,
      course: "6A Secundaria",
      role: "USUARIO",
    });

    res.status(201).json({
      token: createToken(String(user._id), user.role),
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Introduce un carnet y una contraseña válidos." });
      return;
    }

    const user = await UserModel.findOne({ carnet: parsed.data.carnet }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      res.status(401).json({ message: "El carnet o la contraseña son incorrectos." });
      return;
    }

    res.json({ token: createToken(String(user._id), user.role), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAuth, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await UserModel.findById(req.auth?.userId);
    if (!user) {
      res.status(401).json({ message: "La cuenta ya no existe." });
      return;
    }
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});
