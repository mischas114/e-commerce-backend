import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(email: string, pw: string): Promise<any> {
		const user = await this.usersService.findOneEmail(email);
		if (user && user.password === pw) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}
}
