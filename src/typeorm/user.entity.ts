import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({
    nullable: false,
    type: 'varchar'
  })
  username: string;

  @Column({
    nullable: false,
    type: 'varchar'
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar'
  })
  password: string;
}
