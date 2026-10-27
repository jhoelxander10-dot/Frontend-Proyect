import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    carnet: { type: String, required: true, unique: true, trim: true, maxlength: 30 },
    course: { type: String, required: true, default: "6A Secundaria", maxlength: 80 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["ADMIN", "USUARIO"], default: "USUARIO", required: true },
  },
  { timestamps: true, versionKey: false },
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const UserModel = model("User", userSchema);
