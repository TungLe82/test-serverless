import { errorMiddleware, notFoundMiddleware } from "../middlewares/exceptions";
import initExpress from "../utils/init-express";
import productRouter from "./product.router";
import ServerlessHttp from "serverless-http";

const app = initExpress();
app.use("/v1/products", productRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export const productHandler = ServerlessHttp(app);
