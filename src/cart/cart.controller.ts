import { Controller, Get, Delete, Put, Body, Req, HttpStatus, UseGuards } from '@nestjs/common';

import { BasicAuthGuard } from '../auth';
import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req)
    const cart = await this.cartService.findByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart }
    }
  }
  
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    const userId = getUserIdFromRequest(req)
    const cart = await this.cartService.updateByUserId(userId, body)
  
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart }
    }
  }
  
  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req)
    const cart = await this.cartService.removeByUserId(userId);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart }
    }
  }
}
