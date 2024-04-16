import type { Document } from "mongoose";

export interface AdminTypes extends Document {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user" | "sub-admin";
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}
