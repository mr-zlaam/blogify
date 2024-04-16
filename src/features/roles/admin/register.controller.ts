import type { NextFunction, Request, Response } from "express";
import type { AdminTypes } from "./admin.types.ts";
import bcrypt from "bcrypt";
import { HandleError, HandleResponse } from "../../../utils/ExportUtils.ts";
import { AdminModel } from "./admin.model.ts";
import { Config } from "../../../config/_config.ts";
import { sign } from "jsonwebtoken";
const { JWT_SECRETE } = Config;
export default async function registerAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, email, password, role }: AdminTypes = req.body;
    if ([username, email, password, role].some((field) => !field?.trim())) {
      return HandleResponse(403, res, "This field is required!");
    }
    password.length < 6 &&
      HandleResponse(403, res, "Password Must contain atleast 6 characters");
    const existingAdmin = await AdminModel.findOne({ role: "admin" });
    if (existingAdmin) {
      return HandleResponse(
        403,
        res,
        "Admin is already exist!",
        "You can have only one admin at one time",
      );
    }
    let hashedPassword = "";
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return next(HandleError(500, res, error));
    }
    let newAdmin;
    try {
      newAdmin = await AdminModel.create({
        username: username.toLowerCase(),
        password: hashedPassword,
        email: email.toLowerCase(),
        role: role.toLowerCase(),
      });
    } catch (error: any) {
      return next(HandleError(500, res, error));
    }
    const token = sign({ sub: newAdmin._id }, JWT_SECRETE, {
      expiresIn: "7d",
    });
    return HandleResponse(200, res, "Admin Registered successfully", {
      accessToken: token,
    });
  } catch (error: any) {
    return next(HandleError(400, res, error));
  }
}
