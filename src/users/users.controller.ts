import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiCreatedResponse({ type: User })
	@ApiNotFoundResponse()
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@ApiOkResponse({ type: User, isArray: true })
	// @ApiQuery({name: name, required: false}) ||optional nach name suchen
	@Get()
	async getUsers() {
		return this.usersService.findAll();
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.usersService.findOne(id) ?? new NotFoundException();
	}

	@ApiNoContentResponse()
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto) ?? new NotFoundException();
	}

	@ApiNoContentResponse()
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.usersService.remove(id) ?? new NotFoundException();
	}
}
