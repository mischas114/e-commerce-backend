import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailExistsException } from './exceptions/email-exists-exception';
import { EmailNotExistsException } from './exceptions/email-not-exists-exception';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly entityManager: EntityManager,
	) {}

	async create(createUserDto: CreateUserDto) {
		const createdUser: CreateUserDto = this.entityManager.create(User, createUserDto);

		const existingUser: User = await this.usersRepository.findOneBy({
			email: createdUser.email,
		});
		if (existingUser) {
			throw new EmailExistsException(createdUser.email);
		}

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

	async findOneId(id: string) {
		return this.usersRepository.findOneBy({ id });
	}

	async findOneEmail(email: string) {
		const user = await this.usersRepository.findOneBy({ email });
		if (!user) {
			throw new EmailNotExistsException(user.email);
		}

		return this.usersRepository.findOneBy({ email });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
		const updatedUser: User = await this.usersRepository.findOneBy({ id });

		if (!updatedUser) {
			throw new NotFoundException();
		}

		// Update user properties with data from the DTO
		Object.assign(updatedUser, updateUserDto);
		await this.entityManager.save(User, updatedUser);
	}

	async remove(id: string): Promise<boolean> {
		const deletedUser: User = await this.usersRepository.findOneBy({ id });

		if (!deletedUser) {
			throw new NotFoundException(`User with ID ${id} was not found`);
		}

		await this.entityManager.remove(deletedUser);
		return true;
	}
}
