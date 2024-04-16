import type { Response } from "express";
const ApiResponse = (
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
export default ApiResponse;
