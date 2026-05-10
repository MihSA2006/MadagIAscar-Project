import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../../user/user.entity';

@Controller('market/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body('items') items: { productId: string; quantity: number }[]) {
    return this.ordersService.create(req.user, items);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMyOrders(@Request() req: any) {
    return this.ordersService.findByUser(req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post(':id/pay')
  @UseGuards(JwtAuthGuard)
  pay(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.pay(req.user.id, id);
  }
}
