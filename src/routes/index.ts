import express from "express";
import productRouter from "./product";

const router = express.Router();

router.use("/products", productRouter);

export default router;
