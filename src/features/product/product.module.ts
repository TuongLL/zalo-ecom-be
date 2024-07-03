import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CommentService } from '../comment/comment.service';

@Module({
  providers: [ProductService, CommentService],
  controllers: [ProductController],
})
export class ProductModule {}
