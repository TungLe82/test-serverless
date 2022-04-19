import { STATUS_CODE } from "../,,/../../configs/constants";
import { NextFunction, Request, Response } from "express";
import HttpException from "./httpException";

/** Returns 404 if no path is found */
const notFoundMiddleware = (req: Request, res: Response) => {
  console.error(`-----------------------BEGIN ERROR-------------------------------`);
  console.error(`NOT FOUND URL: ${req.path}`);
  console.error(`-----------------------END ERROR---------------------------------`);
  res.status(404).send({ message: `Not found URL ${req.path}` });
};

/** Returns 500 if server error is encountered */
const errorMiddleware = (error: HttpException, req: Request, res: Response, _next: NextFunction) => {
  console.error(`-----------------------BEGIN ERROR-------------------------------`);
  console.error(`API ERROR: ${req.path}`);
  console.error(error.message);
  console.error(`-----------------------END ERROR---------------------------------`);
  const message = error.message || "Internal Server Error";
  res.status(error.status || 500).send({ message, status: STATUS_CODE.ERROR });
};

export { notFoundMiddleware, errorMiddleware };
