import { Router } from "express";
import createAdmin from "./admin.controller";

export const adminRouter = Router();

adminRouter.post("/api/v1", createAdmin);
