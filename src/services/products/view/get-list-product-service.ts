import { TABLE_NAME } from "../../../configs/config";
import { ProductVm } from "../../../models/products";
import DbHelper from "../../../utils/db-helper";

export default async function getListProductService(): Promise<{
  nextToken: string;
  items: ProductVm[];
}> {
  const db = new DbHelper();
  const { nextToken, items: listProduct } = await db.list(TABLE_NAME.PRODUCTS);
  const listProductVm: ProductVm[] = listProduct.map(
    (item) => new ProductVm(item.productId, item.name, item.description)
  );

  return {
    nextToken,
    items: listProductVm,
  };
}
