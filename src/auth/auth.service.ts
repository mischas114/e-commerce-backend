import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		this.logger.log(`Validating user with email: ${email}`);
		const user = await this.usersService.findOneByEmail(email);
		if (user && (await compare(password, user.password))) {
			const { password: password, ...result } = user;
			return result;
		}
		this.logger.warn(`Invalid credentials for user with email: ${email}`);
		return null;
	}

	async login(user: any) {
		this.logger.log(`Logging in user with email: ${user.email}`);
		const payload = {
			email: user.email,
			sub: user.userId,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
