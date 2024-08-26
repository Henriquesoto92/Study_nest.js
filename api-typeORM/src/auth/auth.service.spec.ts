import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { UserEntityList } from '../testing/user-entity-list.mock';
import { acessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { resetToken } from '../testing/reset-token.mock';
import { AuthRegisterDtoMock } from '../testing/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  test('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('method createToken', () => {
      const result = authService.createToken(UserEntityList[0]);

      expect(result).toEqual({ acessToken });
    });
    test('method checkToken', () => {
      const result = authService.checkToken(acessToken);
      expect(result).toEqual(jwtPayload);
    });
    test('method isValidToken', () => {
      const result = authService.isValidToken(acessToken);
      expect(result).toEqual(true);
    });
  });

  describe('autenticação', () => {
    test('method Login', async () => {
      const result = await authService.login('henrique@henrique.com', '123456');
      expect(result).toEqual({ acessToken });
    });

    test('method forget', async () => {
      const result = await authService.forget(UserEntityList[0].email);
      expect(result).toEqual(true);
    });

    test('method reset', async () => {
      const result = await authService.reset('654321', resetToken);
      expect(result).toEqual({ acessToken });
    });

    test('method register', async () => {
      const result = await authService.register(AuthRegisterDtoMock);
      expect(result).toEqual({ acessToken });
    });
  });
});
