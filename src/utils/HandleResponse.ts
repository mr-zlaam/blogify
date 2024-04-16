import type { Response } from "express";
export const HandleResponse = (
  status: number,
  res: Response,
  message: string = "OK",
  data: any = null,
) => {
  return res.status(status).json({
    success: status < 400,
    statusCode: status,
    message: message,
    data: data,
  });
};
