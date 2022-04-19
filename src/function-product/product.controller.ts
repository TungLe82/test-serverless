import { STATUS_CODE } from "../configs/constants";
import { Request, Response, NextFunction } from "express";
import ProductService from "./product.service";
import HttpResponseModel from "../utils/response-util";
import { validateModel } from "../utils/validation";
import {
  CreateProductRequest,
  DeleteProductRequest,
  UpdateProductRequest,
  ViewProductRequest,
  ViewProductListRequest,
} from "./models";

export default class ProductController {
  public async getListProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { limit, next } = req.query;
      const productListReq = new ViewProductListRequest();
      Object.assign(productListReq, { limit, next });
      await validateModel(productListReq);

      const productService: ProductService = new ProductService();
      const result = await productService.getListProduct(productListReq);
      res
        .status(STATUS_CODE.SUCCESS)
        .send(new HttpResponseModel(STATUS_CODE.SUCCESS, result));
    } catch (error) {
      res
        .status(STATUS_CODE.ERROR)
        .send(
          new HttpResponseModel(
            STATUS_CODE.ERROR,
            null,
            error.message ? error.message : error
          )
        );
    }
  }

  public async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productRequest = new CreateProductRequest();
      Object.assign(productRequest, req.body);
      await validateModel(productRequest);

      const productService: ProductService = new ProductService();
      const result = await productService.createProduct(productRequest);
      res
        .status(STATUS_CODE.SUCCESS)
        .send(new HttpResponseModel(STATUS_CODE.SUCCESS, result));
    } catch (error) {
      res
        .status(STATUS_CODE.ERROR)
        .send(
          new HttpResponseModel(
            STATUS_CODE.ERROR,
            null,
            error.message ? error.message : error
          )
        );
    }
  }

  public async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productRequest = new UpdateProductRequest();
      const { productId } = req.params;
      Object.assign(productRequest, req.body, {
        productId,
      });
      await validateModel(productRequest);

      const productService: ProductService = new ProductService();
      const result = await productService.updateProduct(productRequest);
      res
        .status(STATUS_CODE.SUCCESS)
        .send(new HttpResponseModel(STATUS_CODE.SUCCESS, result));
    } catch (error) {
      res
        .status(STATUS_CODE.ERROR)
        .send(
          new HttpResponseModel(
            STATUS_CODE.ERROR,
            null,
            error.message ? error.message : error
          )
        );
    }
  }

  public async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productRequest = new DeleteProductRequest();
      const { productId } = req.params;
      Object.assign(productRequest, {
        productId,
      });
      await validateModel(productRequest);

      const productService: ProductService = new ProductService();
      const result = await productService.deleteProduct(productRequest);
      res
        .status(STATUS_CODE.SUCCESS)
        .send(
          new HttpResponseModel(STATUS_CODE.SUCCESS, { isDeleted: result })
        );
    } catch (error) {
      res
        .status(STATUS_CODE.ERROR)
        .send(
          new HttpResponseModel(
            STATUS_CODE.ERROR,
            null,
            error.message ? error.message : error
          )
        );
    }
  }

  public async viewProductDetail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productRequest = new ViewProductRequest();
      const { productId } = req.params;
      Object.assign(productRequest, {
        productId,
      });
      await validateModel(productRequest);

      const productService: ProductService = new ProductService();
      const result = await productService.viewProductDetail(productRequest);
      res
        .status(STATUS_CODE.SUCCESS)
        .send(new HttpResponseModel(STATUS_CODE.SUCCESS, result));
    } catch (error) {
      res
        .status(STATUS_CODE.ERROR)
        .send(
          new HttpResponseModel(
            STATUS_CODE.ERROR,
            null,
            error.message ? error.message : error
          )
        );
    }
  }
}
