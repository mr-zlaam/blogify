import express from "express";
import ThrowError from "./middleware/Errorhandler.middleware";

export const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
app.use(ThrowError);
