import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';

import { Order } from '../models';

import { Order as OrderEntity} from '../../typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
      @InjectRepository(OrderEntity) private readonly orders: Repository<OrderEntity>,
  ) {}

  findById(orderId: string): Order {
    return this.orders[ orderId ];
  }

  create(data: any) {
    const id = v4(v4())
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    this.orders[ id ] = order;

    return order;
  }

  update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    this.orders[ orderId ] = {
      ...data,
      id: orderId,
    }
  }
}
