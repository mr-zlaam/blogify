import { type NextFunction, type Request, type Response } from "express";
import { HandleError } from "../../config/HandleError";
import type { AdminTypes } from "./admin.types";

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

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Admin created successfully",
    });
  } catch (error) {
    return next(HandleError(500, "unable to register admin for some reason!"));
  }
}
