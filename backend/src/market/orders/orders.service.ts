import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
import { Product } from '../products/product.entity';
import { User } from '../../user/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private dataSource: DataSource,
  ) {}

  async create(user: User, items: { productId: string; quantity: number }[]): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      let totalAmount = 0;
      const orderItems: OrderItem[] = [];

      for (const item of items) {
        const product = await manager.findOne(Product, { where: { id: item.productId } });
        if (!product) {
          throw new NotFoundException(`Product with ID ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new BadRequestException(`Insufficient stock for product ${product.name}`);
        }

        // Deduct stock
        product.stock -= item.quantity;
        product.popularity += item.quantity; // Increase popularity
        await manager.save(product);

        const priceAtPurchase = product.price;
        totalAmount += priceAtPurchase * item.quantity;

        const orderItem = manager.create(OrderItem, {
          product,
          quantity: item.quantity,
          priceAtPurchase,
        });
        orderItems.push(orderItem);
      }

      const order = manager.create(Order, {
          user,
          totalAmount,
          items: orderItems,
          status: OrderStatus.PENDING,
      });

      return manager.save(order);
    });
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'items', 'items.product', 'payment'] });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product', 'payment'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'payment', 'user'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async pay(userId: string, orderId: string): Promise<Payment> {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: { id: orderId, user: { id: userId } },
        relations: ['payment'],
      });

      if (!order) {
          throw new NotFoundException(`Order with ID ${orderId} not found for this user`);
      }

      if (order.status !== OrderStatus.PENDING) {
          throw new BadRequestException(`Order is already ${order.status}`);
      }

      const payment = manager.create(Payment, {
          user: { id: userId } as any,
          order,
          amount: order.totalAmount,
          status: 'SUCCESS',
      });

      order.status = OrderStatus.PAID;
      await manager.save(order);
      return manager.save(payment);
    });
  }
}
