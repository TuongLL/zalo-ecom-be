import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(dto: CategoryDto) {
    return await this.prismaService.category.create({
      data: dto,
    });
  }

  async getAllCategories() {
    return await this.prismaService.category.findMany();
  }

  async deleteCategory(id: string) {
    return await this.prismaService.category.delete({
      where: {
        id,
      },
    });
  }
}
