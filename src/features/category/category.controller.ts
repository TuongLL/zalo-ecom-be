import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryDto } from './dto';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  async createCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
