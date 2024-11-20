/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Blog } from 'src/blog/entities/blog.entity';

@Entity('User', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('text', { name: 'firstName' })
  firstName: string;

  @Column('text', { name: 'lastName' })
  lastName: string;

  @Column('text', { name: 'email', unique: true })
  email: string;

  @Column('text', { name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.READER,
  })
  role: Role;

  @OneToMany(() => Blog, (blog) => blog.user, { cascade: true })
  blogs: Blog[];
}
