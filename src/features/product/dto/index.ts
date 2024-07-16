import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  shortDescription: string;

  @IsOptional()
  @IsNotEmpty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  isStock: boolean;

  @IsBoolean()
  @IsOptional()
  isBestSeller: boolean;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  discountPrice: number;

  @IsNotEmpty()
  media: MediaType[];
}

export class ProductCreateDto extends ProductDto {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @IsArray()
  variants: Variant[];
}

interface Variant {
  name: string;
  price: number;
  discountPrice: number;
  isStock: boolean;
}

export class MediaType {
  url: string;
  type: 'image' | 'video';
}

export interface QueryParamsProduct {
  page?: number;

  sort?: 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc';

  filterByPrice?: {
    startPrice: number;
    endPrice: number;
  };
  categoryId?: string;
  ratingPoint?: number;
}

export class UpdateStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  isBestSeller: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isStock: boolean;
}
