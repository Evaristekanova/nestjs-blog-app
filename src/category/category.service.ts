/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException('Category already exists in the system.');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOneBy({
      id: Number(id),
    });
    if (!existingCategory) throw new BadRequestException('Category not found');
    return existingCategory;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id: Number(id),
    });
    if (!category) throw new NotFoundException('Category not found');
    const updatedCategory = await this.categoryRepository.preload({
      id: Number(id),
      ...updateCategoryDto,
    });

    if (!updatedCategory) {
      throw new BadRequestException('Category not found');
    }
    return this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number) {
    const existingUser = await this.categoryRepository.findOneBy({
      id: Number(id),
    });
    if (!existingUser) throw new NotFoundException('User not found');
    return this.categoryRepository.delete({ id: Number(id) });
  }
}
