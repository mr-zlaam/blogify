import mongoose, { Schema } from "mongoose";
import { type AdminTypes } from "./admin.types";

const adminSchema = new Schema<AdminTypes>(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      default: "zlaam",
      match: [/^[a-z0-9_.]{3,}$/, "Username is invalid"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      default: "zlaam.dev@gmail.com",
      lowercase: true,
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email is invalid!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      match: [
        /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-\s])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-\s]{6,}$/,
        "Please Choose the strong password!",
      ],
    },
    role: {
      type: String,
      required: [true, "Role is required!"],
      enum: ["admin", "sub-admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

export const AdminModel = mongoose.model<AdminTypes>("AdminModel", adminSchema);
