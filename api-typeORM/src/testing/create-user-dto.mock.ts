import { Role } from '../enums/role.enum';
import { CreateUserDto } from '../user/dto/create-user.dto';

export const createUserDto: CreateUserDto = {
  email: 'test@test.com',
  password: '123456',
  name: 'Teste',
  birth_at: new Date('2000-01-01'),
  role: Role.Admin,
};
