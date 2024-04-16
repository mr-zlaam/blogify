import type { NextFunction, Request, Response } from "express";
import type { AdminTypes } from "./admin.types";

import bcrypt from "bcrypt";
import { HandleError, HandleResponse } from "../../utils/ExportUtils.ts";
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({
      username: username.toLowerCase(),
      password: hashedPassword,
      email: email.toLowerCase(),
      role: role.toLowerCase(),
    });
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
