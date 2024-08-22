import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(data: CreateUserDto) {
    if (
      await this.userRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('E-mail já cadastrado.');
    }
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }

  async list() {
    return this.userRepository.find();
  }

  async show(id: number) {
    await this.existId(id);
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async update(
    id: number,
    { email, name, password, birth_at, role }: UpdatePutUserDto,
  ) {
    await this.existId(id);
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    await this.userRepository.update(id, {
      email,
      name,
      password,
      birth_at: birth_at ? new Date(birth_at) : null,
      role,
    });
    return this.show(id);
  }

  async updatePartial(
    id: number,
    { email, name, password, birth_at, role }: UpdatePatchUserDto,
  ) {
    await this.existId(id);
    const data: any = {};
    if (birth_at) {
      data.birth_at = new Date(birth_at);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (role) {
      data.role = role;
    }
    await this.userRepository.update(id, data);
    return this.show(id);
  }

  async delete(id: number) {
    await this.existId(id);
    return this.userRepository.delete(id);
  }

  async existId(id: number) {
    if (
      !(await this.userRepository.exists({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuario de ID:${id} não existe`);
    }
  }
}
