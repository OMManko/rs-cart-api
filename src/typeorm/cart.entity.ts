import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

@Entity('carts')
export class Cart {
	constructor(initialData: Partial<Cart> = null) {
		if (initialData !== null) {
			Object.assign(this, initialData);
		}
	}
	
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column({
		type: 'uuid',
		nullable: false
	})
	product_id: string;
	
	@OneToOne(() => User)
	@Column({
		type: 'uuid',
		nullable: false
	})
	user_id: string;
	
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
	
	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: User
	
	@OneToMany(() => CartItem, (cartItem) => cartItem.cart, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'id', referencedColumnName: 'cart_id' })
	items: CartItem[]
}