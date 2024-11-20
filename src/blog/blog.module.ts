/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { UsersModule } from 'src/users/users.module';
import { CategoryModule } from 'src/category/category.module';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, User, Category]),
    UsersModule,
    CategoryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
