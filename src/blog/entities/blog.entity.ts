/* eslint-disable prettier/prettier */
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Blog', { schema: 'public' })
export class Blog {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title' })
  title: string;

  @Column('character varying', { name: 'content' })
  content: string;

  @ManyToOne(() => User, (user) => user.blogs, { onDelete: 'CASCADE' })
  user: User;
}
