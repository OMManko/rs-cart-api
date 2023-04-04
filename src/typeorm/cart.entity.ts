import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

@Entity('carts')
export class Cart {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@OneToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'user_id' })
	user: User
	
	@Column({
		type: 'timestamptz',
		nullable: false,
	})
	created_at: Date;
	
	@Column({
		type: 'timestamptz',
		nullable: false,
	})
	updated_at: Date;
	
	@Column({
		type: 'enum',
		enum: ["OPEN", "ORDERED"],
		nullable: false,
	})
	status: string;
	
	@OneToMany(() => CartItem, (cartItem) => cartItem.cart)
	cart_items: CartItem[]
}