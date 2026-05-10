import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int', { default: 0 })
  stock: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('float', { default: 0 })
  rating: number;

  @Column({ default: 0 })
  popularity: number; // Used for sorting

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  category: Category;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];
}
