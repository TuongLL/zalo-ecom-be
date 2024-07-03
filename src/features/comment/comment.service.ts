import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(productId: string, body: CommentDto) {
    const { ratingPoint, ...rest } = body;
    return await this.prismaService.$transaction(async (prisma) => {
      const comment = await prisma.comment.create({
        data: { ...rest, productId, ratingPoint },
        select: {
          content: true,
          id: true,
          name: true,
          productId: true,
          ratingPoint: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          ratingPoint:
            (product.ratingPoint + ratingPoint) / (product.ratingCount + 1),
          ratingCount: {
            increment: 1,
          },
        },
      });
      return comment;
    });
  }

  async getCommentsByProductId(productId: string) {
    return await this.prismaService.comment.findMany({
      where: {
        productId,
      },
    });
  }
}
