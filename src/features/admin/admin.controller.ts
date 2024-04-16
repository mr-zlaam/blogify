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
  } catch (error) {
    return next(HandleError(500, "unable to register admin for some reason!"));
  }
}
