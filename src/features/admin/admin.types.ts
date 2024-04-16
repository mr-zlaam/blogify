import type { Document } from "mongoose";

export interface AdminTypes extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | "sub-admin";
  createdAt: Date;
  updatedAt: Date;
}
