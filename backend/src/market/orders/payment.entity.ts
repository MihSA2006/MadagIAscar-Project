import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { Order } from './order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'SUCCESS' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
