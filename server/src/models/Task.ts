import { Schema, model, type InferSchemaType } from "mongoose";

const taskSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    subject: { type: String, required: true, trim: true, maxlength: 100 },
    dueDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
    details: { type: String, trim: true, maxlength: 1000, default: "" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

taskSchema.index({ owner: 1, dueDate: 1 });

export type TaskDocument = InferSchemaType<typeof taskSchema>;
export const TaskModel = model("Task", taskSchema);
