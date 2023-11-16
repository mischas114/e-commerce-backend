import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	NotFoundException,
	Query,
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
import { DeleteDateColumn } from 'typeorm';

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
	@ApiQuery({ name: 'name', required: false, isArray: true })
	@Get()
	async getUsers(@Query('name') name?: string) {
		if (name) {
			return this.usersService.findByName(name);
		}
		return this.usersService.findAll();
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	async findOne(@Param('id') id: string) {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@ApiNoContentResponse({ description: 'User with {id} updated successfully' })
	@ApiNotFoundResponse({ description: 'User with {id} was not found' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		const updatedUser = await this.usersService.update(id, updateUserDto);
		if (updatedUser === undefined) {
			throw new NotFoundException(`User with ID ${id} was not found`);
		}
	}

	@ApiNoContentResponse({ description: 'User  with {id} deleted successfully' })
	@ApiNotFoundResponse({ description: 'User with {id} was not found' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		const deletedUser = await this.usersService.remove(id);
		if (deletedUser === undefined) {
			throw new NotFoundException('User could not be found');
		}
	}
}
