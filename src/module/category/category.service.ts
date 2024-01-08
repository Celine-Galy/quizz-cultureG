import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../model/category/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(_id: number): Promise<Category> {
        return await this.categoryRepository.findOne({
            where: { id: _id }
        })
    }

    async create(category: Category) {
        const newCategory = new Category();
        newCategory.category = category.category;
        return await this.categoryRepository.save(newCategory);
    }

    async update(category: Category) {
        const newCategory = await this.categoryRepository.findOne({
            where: { id: category.id }
        });
        newCategory.category = category.category;
        return await this.categoryRepository.save(newCategory);
    }
}
