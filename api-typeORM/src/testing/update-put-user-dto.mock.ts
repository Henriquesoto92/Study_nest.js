import { Role } from '../enums/role.enum';
import { UpdatePutUserDto } from '../user/dto/update-put-user.dto';

export const updatePutUserDto: UpdatePutUserDto = {
  email: 'test@test.com',
  password: '123456',
  name: 'Teste',
  birth_at: new Date('2000-01-01'),
  role: Role.User,
};
