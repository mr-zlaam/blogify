import { type Request, type Response, type NextFunction } from "express";
import type { HttpError } from "http-errors";

//imports end here
const ThrowError = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statuscode = err.statusCode || 500;
  return next(
    res.status(statuscode).json({
      success: false,
      status: statuscode,
      message: err.message,
      stack: err.stack,
    }),
  );
};
export default ThrowError;
