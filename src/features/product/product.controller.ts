import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductCreateDto, QueryParamsProduct, UpdateStatusDto } from './dto';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from '../comment/dto';
import { CommentService } from '../comment/comment.service';
import { Public } from 'src/core/decorators';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly commentService: CommentService,
  ) {}

  @Post('create')
  async createProduct(@Body() dto: ProductCreateDto) {
    return await this.productService.createProduct(dto);
  }

  @Get()
  @Public()
  async getAllProducts(
    @Query('page') page: string,
    @Query('sort') sort: string,
    @Query('start_price') startPrice: string,
    @Query('end_price') endPrice: string,
    @Query('category_id') categoryId: string,
    @Query('rating_point') ratingPoint: string,
  ) {
    const dto = {
      page: page ? +page : undefined,
      sort: sort as 'price-asc' | 'price-desc',
      filterByPrice: {
        startPrice: startPrice ? +startPrice : undefined,
        endPrice: endPrice ? +endPrice : undefined,
      },
      categoryId: categoryId ? categoryId : undefined,
      ratingPoint: ratingPoint ? +ratingPoint : undefined,
    };

    return await this.productService.getAllProducts(dto);
  }
  @Get(':id/comments')
  async getCommentsByProductId(@Param('id') id: string) {
    return await this.commentService.getCommentsByProductId(id);
  }

  @Get('search')
  @Public()
  async searchProducts(@Query('q') q: string) {
    return await this.productService.searchProducts(q);
  }

  @Patch(':id/update-best-seller-and-stock')
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusDto) {
    return await this.productService.updateStatus(id, body);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() body: ProductCreateDto) {
    return await this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
  @Post(':id/comments')
  async createComment(@Param('id') id: string, @Body() body: CommentDto) {
    return await this.commentService.createComment(id, body);
  }

  @Get('best-seller')
  @Public()
  async getBestSellerProducts(@Query('limit') limit: string){
    return await this.productService.getBestSellerProducts(limit ? +limit : 10);
  }

  @Get('discount')
  @Public()
  async getDiscountProducts(@Query('limit') limit: string){
    return await this.productService.getDiscountProducts(limit ? +limit : 10);
  }

  @Get(':slug')
  @Public()
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.productService.getProductBySlug(slug);
  }
}
