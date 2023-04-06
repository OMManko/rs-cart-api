import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Cart } from './cart.entity';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: User
	
	@ManyToOne(() => Cart, (cart) => cart.id)
	@JoinColumn({ name: 'cart_id' })
	cart: Cart
	
	@Column({
		type: 'json',
		nullable: false
	})
	payment: string;
	
	@Column({
		type: 'json',
		nullable: false
	})
	delivery: string;
	
	@Column({
		type: 'varchar',
		nullable: false
	})
	comments: string;
	
	@Column({
		type: 'enum',
		enum: ["OPEN", "ORDERED"],
		nullable: false
	})
	status: string;
	
	@Column({
		type: 'int',
		nullable: false
	})
	total: number;
}