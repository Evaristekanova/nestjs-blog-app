/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('User', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'firstName' })
  firstName: string;

  @Column('text', { name: 'lastName' })
  lastName: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.READER,
  })
  role: Role;
}
