import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { authLoginDtoMock } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/access-token.mock';
import { authRegisterDtoMock } from '../testing/auth-register-dto.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { authForgetDtoMock } from '../testing/auth-forget.dto.mock';
import { authResetDtoMock } from '../testing/auth-reset.dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { getPhoto } from '../testing/get-photo.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validar a definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    test('method login', async () => {
      const result = await authController.login(authLoginDtoMock);
      expect(result).toEqual({ accessToken });
    });
    test('method register', async () => {
      const result = await authController.register(authRegisterDtoMock);
      expect(result).toEqual({ accessToken });
    });
    test('method forget', async () => {
      const result = await authController.forget(authForgetDtoMock);
      expect(result).toEqual({ success: true });
    });
    test('method reset', async () => {
      const result = await authController.reset(authResetDtoMock);
      expect(result).toEqual({ accessToken });
    });
  });
  describe('Rotas autenticadas', () => {
    test('method me', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });
    test('method uploadPhoto', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
