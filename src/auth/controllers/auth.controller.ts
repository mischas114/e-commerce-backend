import { Controller, Post, Logger, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import {
	ApiTags,
	ApiOperation,
	ApiNotFoundResponse,
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login' })
	@ApiCreatedResponse({ description: 'User logged in' })
	@ApiUnauthorizedResponse({ description: 'User not authorized' })
	@ApiNotFoundResponse({ description: 'User not found' })
	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				email: {
					type: 'email',
					example: 'MaxKarlKopf@gmx.de',
				},
				password: {
					type: 'string',
					example: 'IchBinEinSicheresPasswort123!',
				},
			},
		},
	})
	async login(@Request() req) {
		this.logger.log(`Login request for email: ${req.body.email}`);
		return { msg: 'Login successful' }; //toDo: return jwt
	}

	//other Requests with spezific Roles
	//require a Bearer Token, validare it
}
