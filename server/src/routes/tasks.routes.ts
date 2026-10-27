import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { TaskModel } from "../models/Task.js";

export const tasksRouter = Router();
tasksRouter.use(requireAuth);

const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(100),
  subject: z.string().trim().min(1).max(100),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  details: z.string().trim().max(1000).optional().default(""),
});

const updateTaskSchema = createTaskSchema.partial().extend({
  completed: z.boolean().optional(),
});

tasksRouter.get("/", async (req: AuthenticatedRequest, res, next) => {
  try {
    const tasks = await TaskModel.find({ owner: req.auth!.userId }).sort({ dueDate: 1, createdAt: -1 }).lean();
    res.json({ tasks: tasks.map((task) => ({ ...task, id: String(task._id), _id: undefined, owner: undefined })) });
  } catch (error) {
    next(error);
  }
});

tasksRouter.post("/", async (req: AuthenticatedRequest, res, next) => {
  try {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Completa el título, la materia y una fecha válida." });
      return;
    }

    const task = await TaskModel.create({ ...parsed.data, owner: req.auth!.userId });
    res.status(201).json({ task: { id: String(task._id), title: task.title, subject: task.subject, dueDate: task.dueDate, details: task.details, completed: task.completed, createdAt: task.createdAt, updatedAt: task.updatedAt } });
  } catch (error) {
    next(error);
  }
});

tasksRouter.patch("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ message: "Identificador de tarea inválido." });
      return;
    }
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success || Object.keys(parsed.data ?? {}).length === 0) {
      res.status(400).json({ message: "Los cambios de la tarea no son válidos." });
      return;
    }

    const task = await TaskModel.findOneAndUpdate(
      { _id: req.params.id, owner: req.auth!.userId },
      { $set: parsed.data },
      { new: true, runValidators: true },
    ).lean();

    if (!task) {
      res.status(404).json({ message: "No se encontró la tarea." });
      return;
    }
    res.json({ task: { id: String(task._id), title: task.title, subject: task.subject, dueDate: task.dueDate, details: task.details, completed: task.completed, createdAt: task.createdAt, updatedAt: task.updatedAt } });
  } catch (error) {
    next(error);
  }
});

tasksRouter.delete("/:id", async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ message: "Identificador de tarea inválido." });
      return;
    }
    const deleted = await TaskModel.findOneAndDelete({ _id: req.params.id, owner: req.auth!.userId });
    if (!deleted) {
      res.status(404).json({ message: "No se encontró la tarea." });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
