import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../strategies/guards/local-auth.guard';
import {
	ApiTags,
	ApiOperation,
	ApiOkResponse,
	ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'Login' })
	@ApiOkResponse({ description: 'Successful login' })
	@ApiNotFoundResponse({ description: 'User not found' })
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req) {
		return req.user;
	}
}
