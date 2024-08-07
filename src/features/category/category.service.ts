import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db';
import { CategoryDto, UpdateCategoryDto } from './dto';
import { stringToSlug } from 'src/utils';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(dto: CategoryDto) {
    return await this.prismaService.category.create({
      data: {
        ...dto,
        slug: stringToSlug(dto.name),
      },
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

  async updateCategory(id: string, body: UpdateCategoryDto) {
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...body,
        slug: stringToSlug(body.name),
      },
    });
  }
}
