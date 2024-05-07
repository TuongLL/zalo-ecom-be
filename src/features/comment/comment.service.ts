import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { CommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(body: CommentDto) {
    return await this.prismaService.comment.create({
      data: body,
    });
  }

  async getCommentsByProductId(productId: string) {
    return await this.prismaService.comment.findMany({
      where: {
        productId
      }
    });
  }
}
