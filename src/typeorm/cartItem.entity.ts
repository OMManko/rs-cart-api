import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column({ type: 'uuid', nullable: false })
	cart_id: string;
	
	@ManyToOne(() => Cart, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'cart_id' })
	cart: Cart;
	
	@Column({
		type: 'int',
		nullable: false,
	})
	count: number;
}