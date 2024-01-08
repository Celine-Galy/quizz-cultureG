import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/model/category/category.entity';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @Get()
    async getCategories(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }
}
