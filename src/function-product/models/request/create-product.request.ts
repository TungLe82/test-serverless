import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
