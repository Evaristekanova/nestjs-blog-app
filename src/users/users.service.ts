/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists in the system.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const data = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      id: Number(id),
    });
    if (!existingUser) throw new BadRequestException('User not found');
    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      id: Number(id),
    });
    if (!existingUser) throw new BadRequestException('User not found');
    const user = await this.userRepository.preload({
      id: Number(id),
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const existingUser = await this.userRepository.findOneBy({
      id: Number(id),
    });
    if (!existingUser) throw new NotFoundException('User not found');
    return this.userRepository.delete({ id: Number(id) });
  }
}
