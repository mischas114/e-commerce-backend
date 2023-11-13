import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
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
		const user = new User(createUserDto);
		await this.entityManager.save(user);
	}

	async findAll() {
		return this.usersRepository.find();
	}

	async findOne(id: string) {
		return this.usersRepository.findOneBy({ id });
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.usersRepository.findOneBy({ id });

		if (!user) {
			throw new NotFoundException();
		}

		// Update user properties with data from the DTO
		Object.assign(user, updateUserDto);

		await this.entityManager.save(User, user);
	}

	async remove(id: string) {
		await this.usersRepository.delete(id);
	}
}
