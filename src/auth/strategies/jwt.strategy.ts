import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
const { JWT_SECRET } = dotenv.config().parsed;

/**
 * JwtStrategy class that extends PassportStrategy.
 * This strategy is used for authenticating requests using JSON Web Tokens (JWT).
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET,
		});
	}

	async validate(payload: any) {
		return {
			userId: payload.sub,
			email: payload.username,
		};
	}
}
