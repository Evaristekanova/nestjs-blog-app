/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async verifyUser({ email, password }) {
    const user = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw new UnauthorizedException('wrong email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('wrong email or password');

    const payload = {
      id: user.id,
      name: user.firstName,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'You are loggedin successfully', token: token };
  }
}
