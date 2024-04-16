import type { NextFunction, Request, Response } from "express";
import type { AdminTypes } from "./admin.types";

import bcrypt from "bcrypt";
import { HandleError } from "../../utils/HandleError.ts";
import { AdminModel } from "./admin.model.ts";
import { Config } from "../../config/_config.ts";
import { sign } from "jsonwebtoken";
const { JWT_SECRETE } = Config;
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
    const existingAdmin = await AdminModel.findOne({ role: "admin" });
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
    const token = sign({ sub: newAdmin._id }, JWT_SECRETE, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Admin registered successfully",
      accessToken: token,
    });
  } catch (error: any) {
    return next(HandleError(400, res, error));
  }
}
