import type { NextFunction, Response, Request } from "express";
import { HandleResponse } from "../../utils/ExportUtils";

export default async function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return HandleResponse(200, res, "Every thing is working");
}
