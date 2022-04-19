import { resStructure } from "../../../utils/response-util";
import { Request, Response, NextFunction } from "express";
import productService from "../../../services/products";

export default async function getListProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const result = await productService.getListProductService();
    res.status(200).send(resStructure(200, result));
  } catch (error) {
    res.status(400).send(resStructure(400, "", error));
  }
}
