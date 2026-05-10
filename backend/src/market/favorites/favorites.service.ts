import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { User } from '../../user/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async toggleFavorite(user: User, productId: string): Promise<{ added: boolean }> {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const existingFavorite = await this.favoritesRepository.findOne({
      where: { user: { id: user.id }, product: { id: productId } },
    });

    if (existingFavorite) {
      await this.favoritesRepository.remove(existingFavorite);
      return { added: false };
    } else {
      const favorite = this.favoritesRepository.create({ user, product });
      await this.favoritesRepository.save(favorite);
      return { added: true };
    }
  }

  async findByUser(userId: string): Promise<Favorite[]> {
    return this.favoritesRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }
}
