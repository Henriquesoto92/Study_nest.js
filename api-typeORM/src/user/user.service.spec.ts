import { Test, TestingModule } from '@nestjs/testing';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { UserService } from './user.service';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDto } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { updatePutUserDto } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDto } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });
  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method Create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    test('method List', async () => {
      const result = await userService.list();
      expect(result).toEqual(userEntityList);
    });
    test('method Show', async () => {
      const result = await userService.show(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('method Update', async () => {
      const result = await userService.update(1, updatePutUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
    test('method UpdatePartial', async () => {
      const result = await userService.updatePartial(1, updatePatchUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('method Delete', async () => {
      const result = await userService.delete(1);
      expect(result).toEqual(true);
    });
  });
});
