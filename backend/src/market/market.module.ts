import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CategoriesModule, ProductsModule, FavoritesModule, OrdersModule],
  exports: [CategoriesModule, ProductsModule, FavoritesModule, OrdersModule],
})
export class MarketModule {}
