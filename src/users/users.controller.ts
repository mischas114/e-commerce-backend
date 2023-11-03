import {
	Controller,
	Get,
	Body,
	Post,
	Param,
	Query,
	NotFoundException,
	ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOkResponse({ type: User, isArray: true })
	@ApiQuery({ name: 'name', required: false })
	@Get()
	getUsers(@Query('name') name?: string): User[] {
		return this.usersService.findAll(name);
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	@Get(':id')
	getUserById(@Param('id', ParseIntPipe) id: number): User {
		const user = this.usersService.findById(id);

		if (!user) {
			throw new NotFoundException();
		}
		return user;
	}

	@ApiCreatedResponse({ type: User })
	@ApiBadRequestResponse()
	@Post()
	createUser(@Body() body: CreateUserDto): User {
		return this.usersService.createUser(body);
	}
}
