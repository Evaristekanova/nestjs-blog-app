/* eslint-disable prettier/prettier */
import { Blog } from 'src/blog/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Category', { schema: 'public' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Blog, (blog) => blog.category, { cascade: true })
  blogs: Blog[];
}
