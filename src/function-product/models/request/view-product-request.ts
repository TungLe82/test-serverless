import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  IsOptional,
  IsString,
} from "class-validator";

export class ViewProductRequest {
  @IsUUID("4")
  @IsNotEmpty()
  productId: string;
}

export class ViewProductListRequest {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  next: string;
}
