/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  @IsEnum(Role)
  role: Role;
}
