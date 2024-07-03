import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  @IsArray()
  items: {
    productId: string;
    variantId: string;
    name: string;
    image: string;
    price: number;
    discountPrice: number;
    quantity: number;
  }[];
}
