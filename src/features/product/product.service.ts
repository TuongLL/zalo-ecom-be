import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import {
  ProductCreateDto,
  ProductDto,
  QueryParamsProduct,
  UpdateStatusDto,
} from './dto';
import { stringToSlug } from 'src/utils';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  LIMIT = 20;

  async createProduct(dto: ProductCreateDto) {
    const { categoryId, variants, ...productDto } = dto;
    const [product, productCategory] = await this.prismaService.$transaction(
      async () => {
        const product = await this.prismaService.product.create({
          data: {
            ...productDto,
            media: productDto.media as any,
            slug: stringToSlug(productDto.name),
          },
        });
        const productCategory = await this.prismaService.productCategory.create(
          {
            data: {
              categoryId,
              productId: product.id,
            },
          },
        );
        if (variants.length == 0) {
          await this.prismaService.productVariant.create({
            data: {
              name: productDto.name,
              price: productDto.price,
              discountPrice: productDto.discountPrice,
              productId: product.id,
            },
          });
        } else if (variants.length > 0) {
          await this.prismaService.productVariant.createMany({
            data: variants.map((variant) => ({
              ...variant,
              productId: product.id,
            })),
          });
        }
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
      include: {
        ProductVariant: true,
        ProductCategory: {
          select: {
            categoryId: true,
          },
        },
      },
    });
  }

  async getAllProducts(dto: QueryParamsProduct) {
    const { page, sort, categoryId, ratingPoint, filterByPrice } = dto;

    const skip = this.LIMIT * (page - 1 || 0);

    const countAllProducts = await this.prismaService.product.count({
      where: {
        ProductCategory: {
          some: {
            categoryId: categoryId,
          },
        },
        ratingPoint: {
          gte: ratingPoint,
        },
        price: {
          gte: filterByPrice?.startPrice,
          lte: filterByPrice?.endPrice,
        },
      },
    });
    const products = await this.prismaService.product.findMany({
      skip,
      take: this.LIMIT,
      orderBy: {
        price:
          sort === 'price-asc'
            ? 'asc'
            : sort == 'price-desc'
              ? 'desc'
              : undefined,
        createdAt:
          sort === 'date-asc'
            ? 'asc'
            : sort == 'date-desc'
              ? 'desc'
              : undefined,
      },
      where: {
        ProductCategory: {
          some: {
            categoryId: categoryId,
          },
        },
        ratingPoint: {
          gte: ratingPoint,
        },
        price: {
          gte: filterByPrice?.startPrice,
          lte: filterByPrice?.endPrice,
        },
      },
    });

    return {
      hits: products,
      total: countAllProducts,
    };
  }

  async updateProduct(id: string, body: ProductCreateDto) {
    console.log(id);
    const { categoryId, variants, ...productDto } = body;
    const product = await this.prismaService.$transaction(async (prisma) => {
      const updatedProduct = await prisma.product.update({
        where: {
          id,
        },
        data: {
          ...productDto,
          media: productDto.media as any,
          slug: stringToSlug(productDto.name),
        },
      });

      await prisma.productCategory.deleteMany({
        where: {
          productId: id,
        },
      });

      await prisma.productCategory.create({
        data: {
          categoryId,
          productId: id,
        },
      });
      await prisma.productVariant.deleteMany({
        where: {
          productId: id,
        },
      });

      if (variants.length == 0) {
        await prisma.productVariant.create({
          data: {
            name: productDto.name,
            price: productDto.price,
            discountPrice: productDto.discountPrice,
            productId: id,
          },
        });
      } else if (variants.length > 0) {
        await prisma.productVariant.createMany({
          data: variants.map((variant) => ({
            ...variant,
            productId: id,
          })),
        });
      }
      return updatedProduct;
    });
    return product;
  }

  async updateStatus(id: string, body: UpdateStatusDto) {
    return await this.prismaService.product.update({
      where: {
        id,
      },
      data: body,
    });
  }

  async deleteProduct(id: string) {
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.productCategory.deleteMany({
        where: { productId: id },
      });
      await prisma.productVariant.deleteMany({
        where: { productId: id },
      });

      await prisma.comment.deleteMany({
        where: { productId: id },
      });

      await prisma.product.delete({
        where: { id },
      });
    });
    return true;
  }

  async getBestSellerProducts(limit: number) {
    return await this.prismaService.product.findMany({
      take: limit,
      where: {
        isBestSeller: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getDiscountProducts(limit: number) {
    return await this.prismaService.product.findMany({
      take: limit,
      where: {
        discountPrice: {
          gte: 0,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async searchProducts(q: string) {
    return await this.prismaService.$queryRaw`
    SELECT * FROM "Product"
    WHERE unaccent("name") ILIKE unaccent(${`%${q}%`})
  `;
  }

  async checkVariant(variantIds: string[]) {
    const ids = [];
    for (let i = 0; i < variantIds.length; i++) {
      const variant = await this.prismaService.productVariant.findUnique({
        where: {
          id: variantIds[i],
        },
      });
      variant && ids.push(variant.id);
    }
    return ids;
  }
}
