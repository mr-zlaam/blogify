import type { Response } from "express";
const ApiErrors = (status: number, res: Response, err: any) => {
  return res.status(status).json({
    success: false,
    error: err.name,
    message: err.message,
    stack: err.stack,
    cause: err.cause,
  });
};
export default ApiErrors;
