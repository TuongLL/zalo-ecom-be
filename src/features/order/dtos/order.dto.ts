import { OrderStatus } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: keyof typeof OrderStatus;
}
