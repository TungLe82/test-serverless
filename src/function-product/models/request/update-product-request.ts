import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateProductRequest {
  @IsUUID("4")
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
