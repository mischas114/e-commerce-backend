// import { NotFoundException } from '@nestjs/common';
// import { User } from './entities/user.entity';
// import { UpdateUserDto } from './dto/update-user.dto';

// describe('UsersService', () => {
//   let service: UsersService;
//   import { usersRepository } from './users.service';
//   let repository: usersRepository;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UsersService,
//         {
//           provide: getRepositoryToken(User),
//           useClass: usersRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//     repository = module.get<usersRepository>(getRepositoryToken(User));
//   });

//   describe('findByName', () => {
//     it('should return users with matching first or last name', async () => {
//       const name = 'John';
//       const users: User[] = [
//         { id: '1', firstName: 'John', lastName: 'Doe' },
//         { id: '2', firstName: 'Johnny', lastName: 'Smith' },
//       ];

//       const createQueryBuilderSpy = jest.spyOn(repository, 'createQueryBuilder').mockReturnThis();
//       const whereSpy = jest.spyOn(createQueryBuilderSpy.mockReturnThis(), 'where').mockReturnThis();
//       const getManySpy = jest.spyOn(whereSpy.mockReturnThis(), 'getMany').mockResolvedValueOnce(users);

//       const result = await service.findByName(name);

//       expect(createQueryBuilderSpy).toHaveBeenCalledWith('user');
//       expect(whereSpy).toHaveBeenCalledWith('user.firstName LIKE :name OR user.secondName LIKE :name', { name: `%${name}%` });
//       expect(getManySpy).toHaveBeenCalled();
//       expect(result).toEqual(users);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a user by ID', async () => {
//       const id = '1';
//       const user: User = { id, firstName: 'John', lastName: 'Doe' };

//       const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(user);

//       const result = await service.findOne(id);

//       expect(findOneBySpy).toHaveBeenCalledWith({ id });
//       expect(result).toEqual(user);
//     });
//   });

//   describe('update', () => {
//     it('should update a user by ID', async () => {
//       const id = '1';
//       const updateUserDto: UpdateUserDto = { firstName: 'John', lastName: 'Doe' };

//       const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce({ id, ...updateUserDto });
//       const saveSpy = jest.spyOn(repository, 'save').mockResolvedValueOnce();

//       await service.update(id, updateUserDto);

//       expect(findOneBySpy).toHaveBeenCalledWith({ id });
//       expect(saveSpy).toHaveBeenCalledWith({ id, ...updateUserDto });
//     });

//     it('should throw NotFoundException if user is not found', async () => {
//       const id = '1';
//       const updateUserDto: UpdateUserDto = { firstName: 'John', lastName: 'Doe' };

//       jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);

//       await expect(service.update(id, updateUserDto)).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('remove', () => {
//     it('should remove a user by ID', async () => {
//       const id = '1';
//       const deletedUser: User = { id, firstName: 'John', lastName: 'Doe' };

//       const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(deletedUser);
//       const removeSpy = jest.spyOn(repository, 'remove').mockResolvedValueOnce();

//       const result = await service.remove(id);

//       expect(findOneBySpy).toHaveBeenCalledWith({ id });
//       expect(removeSpy).toHaveBeenCalledWith(deletedUser);
//       expect(result).toBe(true);
//     });

//     it('should throw NotFoundException if user is not found', async () => {
//       const id = '1';

//       jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);

//       await expect(service.remove(id)).rejects.toThrow(NotFoundException);
//     });
//   });
// });

// // Fix missing import
// import { QueryRunner } from 'typeorm';
// import { TestingModule, Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { UsersService } from './users.service';

// // Fix missing variable declaration
// const users: User[] = [];

// // Fix missing argument in mockResolvedValueOnce
// const saveSpy = jest.spyOn(repository, 'save').mockResolvedValueOnce({});

// // Fix missing argument in mockResolvedValueOnce
// const removeSpy = jest.spyOn(repository, 'remove').mockResolvedValueOnce({});

// // Fix unknown property in object literal
// const updateUserDto: UpdateUserDto = { firstName: 'John' };

//       expect(findSpy).toHaveBeenCalled();
//       expect(result).toEqual(users);
//     });
//   });

//   describe('findByName', () => {
//     it('should return users with matching first or last name', async () => {
//       const name = 'John';
//       const users: User[] = [
//         { id: '1', firstName: 'John', lastName: 'Doe' },
//         { id: '2', firstName: 'Johnny', lastName: 'Smith' },
//       ];

//       const createQueryBuilderSpy = jest.spyOn(repository, 'createQueryBuilder').mockReturnThis();
//       const whereSpy = jest.spyOn(createQueryBuilderSpy.mockReturnThis(), 'where').mockReturnThis();
//       const getManySpy = jest.spyOn(whereSpy.mockReturnThis(), 'getMany').mockResolvedValueOnce(users);

//       const result = await service.findByName(name);

//       expect(createQueryBuilderSpy).toHaveBeenCalledWith('user');
//       expect(whereSpy).toHaveBeenCalledWith('user.firstName LIKE :name OR user.secondName LIKE :name', { name: `%${name}%` });
//       expect(getManySpy).toHaveBeenCalled();
//       expect(result).toEqual(users);
//     });
//   });

//   describe('findOne', () => {
//     it('should return a user by ID', async () => {
//       const id = '1';
//       const user: User = { id, firstName: 'John', lastName: 'Doe' };

//       const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(user);

//       const result = await service.findOne(id);

//       expect(findOneBySpy).toHaveBeenCalledWith({ id });
//       expect(result).toEqual(user);
//     });
//   });

//   describe('update', () => {
//     it('should update a user by ID', async () => {
//       const id = '1';
//       const updateUserDto: UpdateUserDto = { firstName: 'John', lastName: 'Doe' };

//       const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce({ id, ...updateUserDto });
//       const saveSpy = jest.spyOn(repository, 'save').mockResolvedValueOnce();

//       await service.update(id, updateUserDto);

//       expect(findOneBySpy).toHaveBeenCalledWith({ id });
//       expect(saveSpy).toHaveBeenCalledWith({ id, ...updateUserDto });
//     });

//     it('should throw NotFoundException if user is not found', async () => {
//       const id = '1';
//       const updateUserDto: UpdateUserDto = { firstName: 'John', lastName: 'Doe' };

//       jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);

//       await expect(service.update(id, updateUserDto)).rejects.toThrow(NotFoundException);
//     });
//   });

//   describe('remove', () => {
//     it('should remove a user by ID', async () => {
//       const id = '1';
//       const deletedUser: User = { id, firstName: 'John', lastName: 'Doe' };

//       const findOneBySpy = jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(deletedUser);
//       const removeSpy = jest.spyOn(repository, 'remove').mockResolvedValueOnce();

//       const result = await service.remove(id);

//       expect(findOneBySpy).toHaveBeenCalledWith({ id });
//       expect(removeSpy).toHaveBeenCalledWith(deletedUser);
//       expect(result).toBe(true);
//     });

//     it('should throw NotFoundException if user is not found', async () => {
//       const id = '1';

//       jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);

//       await expect(service.remove(id)).rejects.toThrow(NotFoundException);
//     });
//   });
// });
