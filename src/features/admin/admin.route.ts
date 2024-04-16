import { Router } from "express";
import createAdmin from "./admin.controller";
export const adminRouter = Router();

adminRouter.post("/admin", createAdmin);
adminRouter.get("/admin", (req, res, next) => {
  res.json({
    success: true,
    message: "Admin router is working",
  });
});
