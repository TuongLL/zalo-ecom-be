import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductCreateDto } from './dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() dto: ProductCreateDto) {}

  @Get(':slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.productService.getProductBySlug(slug);
  }
}
