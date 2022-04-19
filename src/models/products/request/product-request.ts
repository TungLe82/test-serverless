import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
