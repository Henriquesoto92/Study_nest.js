import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { ParamID } from 'src/decorators/param-id.decorator';
// import { LogInterceptor } from 'src/interceptors/log.interceptor';

// @UseInterceptors(LogInterceptor) //pega em todo o controller
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor) pega somente na request
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamID() id: number) {
    console.log('🚀 ~ id:', id);

    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDto, @ParamID() id: number) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDto, @ParamID() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamID() id: number) {
    return this.userService.delete(id);
  }
}
