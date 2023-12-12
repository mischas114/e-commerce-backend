import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	private logger = new Logger(LocalStrategy.name);

	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}
	async validate(email: string, password: string): Promise<any> {
		this.logger.debug(`Validating user with email: ${email}`);
		const user = await this.authService.validateUser(email, password);
		if (!user) {
			this.logger.error(`User with email: ${email} not found`);
			throw new UnauthorizedException();
		}
		this.logger.debug(`User with email: ${email} successfully validated`);
		return user;
	}
}
