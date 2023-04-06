import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Cart, CartItem } from '../../typeorm';

@Injectable()
export class CartService {
  constructor(
      @InjectRepository(Cart) private readonly userCarts: Repository<Cart>,
  ) {}
  
  async findByUserId(userId: string): Promise<Cart> {
    return this.userCarts.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.user', 'user')
        .leftJoinAndSelect('cart.items', 'item')
        .select(['cart', 'user.id', 'user.name', 'user.email', 'item'])
        .where('cart.user_id = :userId', { userId })
        .getOne();
  }
  
  async createByUserId(userId: string): Promise<Cart> {
    const cart = new Cart({
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      status: 'OPEN',
    });
    return this.userCarts.save(cart);
  }
  
  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const cart = this.findByUserId(userId);
    
    if (cart) {
      return cart;
    }
    
    return this.createByUserId(userId);
  }
  
  async updateByUserId(userId: string, updateCartDto: Partial<Cart>) {
    return this.userCarts.createQueryBuilder()
        .update(Cart)
        .set(updateCartDto)
        .where("user_id = :userId", { userId })
        .execute()
  }
  
  async removeByUserId(userId: string) {
    return this.userCarts
        .createQueryBuilder()
        .delete()
        .from(Cart)
        .where('user_id = :userId', { userId })
        .execute();
  }
}
