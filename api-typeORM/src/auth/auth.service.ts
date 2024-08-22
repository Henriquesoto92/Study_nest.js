import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    console.log('🚀 ~ user:', user);

    return {
      acessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
      throw new BadRequestException(e);
    }
  }
  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }
    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto.');
    }
    const token = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    console.log('🚀 ~ token:', token);

    await this.mailerService.sendMail({
      subject: 'Recuperação de Senha',
      to: 'henriquesoto92@gmail.com',
      template: 'forget',
      context: {
        name: user.name,
        token: token,
      },
    });
    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });
      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token inválido.');
      }
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      await this.userRepository.update(Number(data.id), {
        password,
      });
      const user = await this.userService.show(Number(data.id));

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}