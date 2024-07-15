import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from './dto';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorators';

@Controller('categories')
@ApiTags('categories')

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('')
  async createCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Get()
  @Public()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Patch(':id')
  async updateCategory(@Body() dto: UpdateCategoryDto, @Param('id') id: string){
    return await this.categoryService.updateCategory(id,dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
