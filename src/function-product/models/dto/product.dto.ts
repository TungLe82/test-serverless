import { v4 } from "uuid";

export class ProductDto {
  productId: string;
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.productId = v4();
    this.name = name;
    this.description = description;
  }
}
