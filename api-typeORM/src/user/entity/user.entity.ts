import { Role } from 'src/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
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
  birth_at: Date;
  @CreateDateColumn()
  created_at: string;
  @UpdateDateColumn()
  updated_at: string;
  @Column({ default: Role.User })
  role: number;
}
