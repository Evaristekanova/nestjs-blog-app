/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
