import { IsNotEmpty, IsString } from "class-validator";

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;
  
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    productId: string;
}