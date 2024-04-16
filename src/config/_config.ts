import dotenv from "dotenv";
import path from "node:path";
dotenv.config({
  path: path.resolve(`${__dirname}../../.env`),
});
export const Config = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.CONNECTION_STR as string,
};
