import { type NextFunction, type Request, type Response } from "express";
import { HandleError } from "../../config/HandleError";
import type { AdminTypes } from "./admin.types";
import bcrypt from "bcrypt";
import { AdminModel } from "./admin.model";
export default async function createAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, email, password, role }: AdminTypes = req.body;
    if (!username || !email || !password || !role) {
      return next(
        res.status(400).json({
          success: false,
          status: 400,
          message: "This field is required!",
        }),
      );
    } else if (password.length < 6) {
      return next(
        res.status(400).json({
          success: false,
          status: 400,
          message: "Password must contain atleast 6 characters!",
        }),
      );
    }
    const existingAdmin = await AdminModel.find({ role: "admin" });
    if (existingAdmin) {
      return next(
        res.status(403).json({
          success: false,
          status: 403,
          message: "Admin already exists!",
        }),
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({
      username,
      password: hashedPassword,
      email,
      role,
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Admin registered successfully",
    });
  } catch (error) {
    return next(HandleError(500, "unable to register admin for some reason!"));
  }
}
