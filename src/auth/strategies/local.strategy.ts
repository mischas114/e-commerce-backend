import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

/**
 * Strategy for authenticating users using local username=email and password.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	private logger = new Logger(LocalStrategy.name);

	constructor(private authService: AuthService) {
		super({ usernameField: 'email' });
	}

	/**
	 * Validates the user's credentials.
	 * @param email - The user's email.
	 * @param password - The user's password.
	 * @returns A Promise that resolves to the authenticated user.
	 * @throws UnauthorizedException if the user is not found or the credentials are invalid.
	 */
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
