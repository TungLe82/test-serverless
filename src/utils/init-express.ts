import { errorMiddleware } from "../middlewares/exceptions";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

export default function initExpress() {
  const app = express();
  app.use(cors({ origin: true }));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(errorMiddleware);

  return app;
}
