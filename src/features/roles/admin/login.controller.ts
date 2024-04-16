import type { NextFunction, Response, Request } from "express";
import { HandleError, HandleResponse } from "../../../utils/ExportUtils";
import type { AdminTypes } from "./admin.types";
import { AdminModel } from "./admin.model";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Config } from "../../../config/_config";

export default async function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { JWT_SECRETE } = Config;
  try {
    const { email, password }: AdminTypes = req.body;
    if (!email || !password)
      return HandleResponse(400, res, "This field is required");
    let UserExistAlready;

    try {
      UserExistAlready = await AdminModel.findOne({ email });
    } catch (error) {
      return next(HandleError(500, res, error));
    }

    if (!UserExistAlready) return HandleResponse(400, res, "Admin not found!");
    //Credential Checks
    let isCredentialMatch;
    try {
      isCredentialMatch = await bcrypt.compare(
        password,
        UserExistAlready?.password,
      );
    } catch (error: any) {
      return next(HandleError(500, res, error));
    }
    if (!isCredentialMatch)
      return HandleResponse(400, res, "Invalid Credentials");
    const accessToken = sign({ sub: UserExistAlready?._id }, JWT_SECRETE, {
      expiresIn: "7d",
    });
    return HandleResponse(200, res, "logined Successfull", { accessToken });
  } catch (error: any) {
    return HandleError(400, res, error);
  }
}
