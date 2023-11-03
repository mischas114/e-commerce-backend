import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	private users: any = [
		{ id: 0, name: 'Marius' },
		{ id: 2, name: 'Quarius' },
		{ id: 5, name: 'Marius' },
	];

	findAll(name?: string): User[] {
		if (name) {
			return this.users.filter((user) => user.name === name);
		} else {
			return this.users;
		}
	}

	findById(userId: number): User {
		return this.users.find((user) => user.id === userId);
	}

	createUser(createUserDto: CreateUserDto): User {
		const newUser = { id: Date.now(), ...createUserDto };
		//hinzufügen zum Array _> später DB
		this.users.push(newUser);
		return newUser;
	}
}
