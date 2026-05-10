import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getUsers() {
        return this.userRepository.find();
    }

    async getUser({ userId }: { userId: string }) {
        return this.userRepository.findOne({
            where: { id: userId },
            // relations: ['favorites', 'favorites.product', 'orders', 'orders.items', 'orders.items.product', 'payments', 'orders.payment'],
        });
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(userData: Partial<User>) {
        return this.userRepository.save(userData);
    }
}