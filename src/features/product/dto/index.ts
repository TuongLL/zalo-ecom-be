import {
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
  short_description: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  is_stock: boolean;

  @IsBoolean()
  @IsOptional()
  is_best_seller: boolean;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  media: MediaType[];
}

export class ProductCreateDto extends ProductDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: string;
}

export class MediaType {
  url: string;
  type: 'image' | 'video';
}

// name              String
//   description       String
//   short_description String
//   media             Json[]
//   slug              String
//   is_stock          Boolean
//   is_best_seller    Boolean
//   price             Float
