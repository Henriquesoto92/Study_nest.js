import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
  @Column({
    length: 63,
  })
  name: string;
  @Column({
    length: 127,
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'date',
    nullable: true,
  })
  birth_at: string;
  @CreateDateColumn()
  created_at: string;
  @UpdateDateColumn()
  updated_at: string;
  @Column({
    enum: [1, 2],
  })
  role: number;
}
