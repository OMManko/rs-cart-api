import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
	@PrimaryGeneratedColumn('uuid')
	product_id: string;
	
	@ManyToOne(() => Cart, (cart) => cart.cart_items)
	@JoinColumn({ name: 'cart_id' })
	cart: Cart;
	
	@Column({
		type: 'int',
		nullable: false,
	})
	count: number;
}