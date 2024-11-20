/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Blog } from './entities/blog.entity';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @Req() req,
  ): Promise<Blog> {
    if (!createBlogDto.categoryId) {
      throw new BadRequestException('categoryId is required');
    }

    const userId = req.user.id;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User not found`);

    const category = await this.categoryRepository.findOne({
      where: { id: createBlogDto.categoryId },
    });
    if (!category) throw new NotFoundException(`Category not found`);

    const blog = this.blogRepository.create({
      ...createBlogDto,
      user,
      category,
    });

    return await this.blogRepository.save(blog);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
