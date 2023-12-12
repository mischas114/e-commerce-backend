import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailExistsException } from './exceptions/email-exists-exception';
import { EmailNotExistsException } from './exceptions/email-not-exists-exception';
import { UserWithoutPassword } from './users.controller';
import { hash } from 'bcrypt';
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly entityManager: EntityManager,
	) {}

	async hashedPassword(password: string): Promise<string> {
		const saltRounds = 10;
		const hashedPassword: string = await hash(password, saltRounds);
		return hashedPassword;
	}

	async create(createUserDto: CreateUserDto) {
		let createdUser: CreateUserDto = this.entityManager.create(User, createUserDto);

		const existingUser: User = await this.usersRepository.findOneBy({
			email: createdUser.email,
		});
		if (existingUser) {
			throw new EmailExistsException(createdUser.email);
		}

		const { password, ...rest } = createdUser;
		const newPassword: string = await this.hashedPassword(password);
		const createdUserWithPassword = { ...rest, password: newPassword };

		await this.entityManager.save(User, createdUserWithPassword);
	}

	async findAll(): Promise<UserWithoutPassword[]> {
		const users: User[] = await this.usersRepository.find();
		return users.map(({ password, ...rest }: User): UserWithoutPassword => rest);
	}

	async findByName(name: string): Promise<UserWithoutPassword[]> {
		const users: User[] = await this.usersRepository
			.createQueryBuilder('user')
			.where('user.firstName LIKE :name OR user.secondName LIKE :name', {
				name: `%${name}%`,
			})
			.getMany();
		return users.map(({ password, ...rest }: User): UserWithoutPassword => rest);
	}

	async findOneById(id: string) {
		return await this.usersRepository.findOneBy({ id });
	}

	async findOneByEmail(email: string) {
		const user = await this.usersRepository.findOneBy({ email });
		if (!user) {
			throw new EmailNotExistsException(user.email);
		}
		return user;
	}

	/**
	 * Updates a user with the provided email using the data from the updateUserDto.
	 * If the user is not found, a NotFoundException is thrown.
	 * If the password in the updateUserDto is different from the current password,
	 * the password is hashed and updated before saving the user.
	 * @param email - The email of the user to update.
	 * @param updateUserDto - The data to update the user with.
	 * @returns A Promise that resolves to void.
	 */
	/**
	 * Updates a user's information based on the provided email.
	 * If the email in the newUserData is different from the user's current email,
	 * it checks if the new email already exists in the database and throws an exception if it does.
	 * If the user is not found, it throws an exception.
	 * If the newUserData does not contain a password, it keeps the user's current password.
	 * If the new password is different from the user's current password,
	 * it hashes the new password and updates the user's password.
	 * Finally, it updates the user's properties with the data from the newUserData and saves the changes.
	 * @param email - The email of the user to update.
	 * @param newUserData - The new data to update the user with.
	 * @returns A Promise that resolves to void.
	 * @throws {EmailExistsException} - If the new email already exists in the database.
	 * @throws {EmailNotExistsException} - If the user with the provided email is not found.
	 */
	async update(email: string, newUserData: UpdateUserDto): Promise<void> {
		const user: User = await this.usersRepository.findOneBy({ email });

		if (newUserData.email && user.email !== newUserData.email) {
			if (await this.usersRepository.findOneBy({ email: newUserData.email })) {
				throw new EmailExistsException(newUserData.email);
			}
		}

		if (!user) {
			throw new EmailNotExistsException(email);
		}

		if (newUserData.password === undefined) {
			newUserData.password = user.password;
		}

		if (user.password !== newUserData.password) {
			const newHashedPassword: string = await this.hashedPassword(newUserData.password);
			newUserData.password = newHashedPassword;
		}

		// merge old and new data (new data overrides old data)
		await this.entityManager.save(User, { ...user, ...newUserData });
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
