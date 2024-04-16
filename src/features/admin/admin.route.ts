import { Router } from "express";
import registerAdmin from "./register.controller";
export const adminRouter = Router();

adminRouter.get("/admin", (req, res, next) => {
  res.json({
    success: true,
    message: "Admin router is working",
  });
});

adminRouter.post("/admin", registerAdmin);
