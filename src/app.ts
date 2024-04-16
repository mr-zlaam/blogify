import express from "express";
import ThrowError from "./middleware/Errorhandler.middleware";
import { adminRouter } from "./features/admin/admin.route";

export const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    status: 200,
    message: "OK",
  });
});

app.use(ThrowError);
app.use("/api/v1", adminRouter);
