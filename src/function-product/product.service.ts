import DbHelper from "../utils/db-helper";
import {
  CreateProductRequest,
  DeleteProductRequest,
  ProductVm,
  UpdateProductRequest,
  ViewProductListRequest,
  ViewProductRequest,
} from "./models";
import { TABLE_NAME } from "../configs/config";
import { ProductDto } from "./models/dto/product.dto";

export default class ProductService {
  private readonly db: DbHelper;

  constructor() {
    this.db = new DbHelper();
  }

  public async getListProduct(productListReq: ViewProductListRequest): Promise<{
    nextToken: string;
    items: ProductVm[];
  }> {
    const { db } = this;
    const { nextToken, items: listProduct } = await db.list(
      TABLE_NAME.PRODUCTS,
      productListReq.limit,
      "productId",
      productListReq.next
    );
    const listProductVm: ProductVm[] = listProduct.map(
      (item) => new ProductVm(item.productId, item.name, item.description)
    );

    return {
      nextToken,
      items: listProductVm,
    };
  }

  public async createProduct(
    product: CreateProductRequest
  ): Promise<ProductVm> {
    const { db } = this;
    const productDto = new ProductDto(product.name, product.description);
    const data = await db.insertOrReplace(TABLE_NAME.PRODUCTS, productDto);

    return new ProductVm(
      productDto.productId,
      productDto.name,
      productDto.description
    );
  }

  public async updateProduct(
    product: UpdateProductRequest
  ): Promise<ProductVm> {
    const { db } = this;
    const dataUpdate = { ...product };
    delete dataUpdate.productId;

    const data = await db.updateById(
      TABLE_NAME.PRODUCTS,
      { productId: product.productId },
      dataUpdate
    );

    return new ProductVm(product.productId, product.name, product.description);
  }

  public async deleteProduct(product: DeleteProductRequest): Promise<boolean> {
    const { db } = this;

    const data = await db.deleteById(TABLE_NAME.PRODUCTS, {
      productId: product.productId,
    });

    return true;
  }

  public async viewProductDetail(
    product: ViewProductRequest
  ): Promise<ProductVm | null> {
    const { db } = this;

    const data = await db.findById(TABLE_NAME.PRODUCTS, {
      productId: product.productId,
    });

    return data
      ? new ProductVm(data.productId, data.name, data.description)
      : null;
  }
}
