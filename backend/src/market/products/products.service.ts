import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThan, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(query?: any): Promise<Product[]> {
    const {
      search,
      categoryId,
      minPrice,
      maxPrice,
      minRating,
      available,
      sortBy,
      sortOrder = 'DESC',
    } = query || {};

    const where: any = {};

    if (search) {
      where.name = Like(`%${search}%`);
      // Note: For more complex search (name OR description), you'd use a QueryBuilder
    }

    if (categoryId) {
      where.category = { id: categoryId };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.price = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.price = MoreThanOrEqual(minPrice);
    } else if (maxPrice !== undefined) {
      where.price = LessThanOrEqual(maxPrice);
    }

    if (minRating !== undefined) {
      where.rating = MoreThanOrEqual(minRating);
    }

    if (available === 'true') {
      where.stock = MoreThan(0);
    }

    const order: any = {};
    if (sortBy === 'popularity') {
      order.popularity = sortOrder;
    } else if (sortBy === 'price') {
      order.price = sortOrder;
    } else if (sortBy === 'novelty') {
      order.createdAt = sortOrder;
    } else {
      order.createdAt = 'DESC'; // Default
    }

    return this.productsRepository.find({
      where,
      order,
      relations: ['category'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: any): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product) as unknown as Promise<Product>;
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    const product = await this.findOne(id);
    this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(product) as unknown as Promise<Product>;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  async updateImages(id: string, imagePaths: string[]): Promise<Product> {
    const product = await this.findOne(id);
    product.images = [...(product.images || []), ...imagePaths];
    return this.productsRepository.save(product) as Promise<Product>;
  }
}
