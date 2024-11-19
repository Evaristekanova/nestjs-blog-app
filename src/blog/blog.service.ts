/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new blog
  async create(createBlogDto: CreateBlogDto, userId: number): Promise<Blog> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const blog = this.blogRepository.create({ ...createBlogDto, user });
    return await this.blogRepository.save(blog);
  }

  // Get all blogs
  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({ relations: ['user'] });
  }

  // Get a single blog by ID
  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  // Update a blog by ID
  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    Object.assign(blog, updateBlogDto);
    return await this.blogRepository.save(blog);
  }

  // Delete a blog by ID
  async remove(id: number): Promise<void> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    await this.blogRepository.remove(blog);
  }
}
