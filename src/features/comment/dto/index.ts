import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

//   @IsString()
//   @IsNotEmpty()
//   productId: string;

  @IsNumber()
  @IsNotEmpty()
  ratingPoint: number;
}
