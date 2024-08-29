import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    email: 'test@test.com',
    password: '$2b$10$ybCCJ7P9HlHvcSXwPNB/dOCS.d.v7hQ4d8JcOgKOFlclLLTqkrokS',
    name: 'Teste',
    birth_at: new Date('2000-01-01'),
    role: Role.Admin,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    email: 'test2@test.com',
    password: '$2b$10$ybCCJ7P9HlHvcSXwPNB/dOCS.d.v7hQ4d8JcOgKOFlclLLTqkrokS',
    name: 'Teste2',
    birth_at: new Date('2000-01-01'),
    role: Role.Admin,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    email: 'test3@test.com',
    password: '$2b$10$ybCCJ7P9HlHvcSXwPNB/dOCS.d.v7hQ4d8JcOgKOFlclLLTqkrokS',
    name: 'Teste3',
    birth_at: new Date('2000-01-01'),
    role: Role.Admin,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
