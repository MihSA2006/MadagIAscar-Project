import { Controller, Post, Param, UseGuards, Request, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('market/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('toggle/:productId')
  @UseGuards(JwtAuthGuard)
  toggleFavorite(@Request() req: any, @Param('productId') productId: string) {
    return this.favoritesService.toggleFavorite(req.user, productId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyFavorites(@Request() req: any) {
    return this.favoritesService.findByUser(req.user.id);
  }
}
