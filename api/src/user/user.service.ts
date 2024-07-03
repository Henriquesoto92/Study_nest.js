import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
    //   {
    //   where: {email: {
    //     contains: '@gmail.com'
    //   }}
    // })
  }

  async show(id: number) {
    await this.existId(id);
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    // funciona, porem gasta rescursos desnecessario
    // return this.prisma.user.findFirst({
    //   where: { id: id },
    // });
  }

  async update(
    id: number,
    { email, name, password, birth_at, role }: UpdatePutUserDto,
  ) {
    await this.existId(id);

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birth_at: birth_at ? new Date(birth_at) : null,
        role,
      },
      where: { id: id },
    });
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
      data.password = password;
    }
    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data: data,
      where: { id: id },
    });
  }

  async delete(id: number) {
    await this.existId(id);
    return this.prisma.user.delete({ where: { id: id } });
  }

  async existId(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuario de ID:${id} não existe`);
    }
  }
}
