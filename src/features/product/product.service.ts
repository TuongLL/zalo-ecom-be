import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { ProductCreateDto, ProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(dto: ProductCreateDto) {
    const { categoryId, ...productDto } = dto;
    const [product, productCategory] = await this.prismaService.$transaction(
      async () => {
        const product = await this.prismaService.product.create({
          data: productDto as any,
        });
        const productCategory = await this.prismaService.productCategory.create(
          {
            data: {
              categoryId,
              productId: product.id,
            },
          },
        );
        return [product, productCategory];
      },
    );
    return product;
  }

  async getProductBySlug(slug: string) {
    return await this.prismaService.product.findFirst({
      where: {
        slug,
      },
    });
  }
}
