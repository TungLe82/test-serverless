import express from "express";
import ServerlessHttp from "serverless-http";
import { json, urlencoded } from "body-parser";
import api from "./routes";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api", api);

export const handler = ServerlessHttp(app);
