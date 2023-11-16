import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly entityManager: EntityManager,
	) {}

	async create(createUserDto: CreateUserDto) {
		const createdUser: CreateUserDto = this.entityManager.create(User, createUserDto);
		await this.entityManager.save(User, createdUser);
	}

	async findAll() {
		return this.usersRepository.find();
	}

	async findByName(name: string) {
		const users: User[] = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.firstName LIKE :name OR user.secondName LIKE :name', {
				name: `%${name}%`,
			})
			.getMany();
		return users;
	}

	async findOne(id: string) {
		return this.usersRepository.findOneBy({ id });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
		const updatedUser = await this.usersRepository.findOneBy({ id });

		if (!updatedUser) {
			throw new NotFoundException();
		}

		// Update user properties with data from the DTO
		Object.assign(updatedUser, updateUserDto);

		await this.entityManager.save(User, updatedUser);
	}

	async remove(id: string): Promise<void> {
		const deletedUser = await this.usersRepository.findOneBy({ id });

		if (!deletedUser) {
			throw new NotFoundException();
		}

		await this.entityManager.remove(deletedUser);
	}
}
