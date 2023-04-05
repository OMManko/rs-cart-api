import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';
import { UsersModule } from '../users/users.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { Cart } from '../typeorm';


@Module({
  imports: [ TypeOrmModule.forFeature([Cart]), OrderModule, UsersModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
