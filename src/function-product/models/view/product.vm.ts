export class ProductVm {
  productId: string;
  name: string;
  description: string;

  constructor(productId: string, name: string, description: string) {
    this.productId = productId;
    this.name = name;
    this.description = description;
  }
}
