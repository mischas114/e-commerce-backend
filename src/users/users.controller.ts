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

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiCreatedResponse({ type: User })
	@ApiNotFoundResponse()
	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<void> {
		return this.usersService.create(createUserDto);
	}

	@ApiOkResponse({ type: User, isArray: true })
	@ApiQuery({ name: 'name', required: false, isArray: true })
	@Get()
	async getUsers(@Query('name') name?: string): Promise<User[]> {
		if (name) {
			return this.usersService.findByName(name);
		}
		return this.usersService.findAll();
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	@Get('id/:id')
	async findOneId(@Param('id') id: string): Promise<User> {
		const user = await this.usersService.findOneId(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	@Get('email/:email')
	async findOneEmail(@Param('email') email: string): Promise<User> {
		const user = await this.usersService.findOneEmail(email);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@ApiNoContentResponse({ description: 'User with {id} updated successfully' })
	@ApiNotFoundResponse({ description: 'User with {id} was not found' })
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<void> {
		const updatedUser = await this.usersService.update(id, updateUserDto);
		if (updatedUser === undefined) {
			throw new NotFoundException(`User with ID ${id} was not found`);
		}
	}

	//toDO Fehlerrückgabe inkonsistent mit anderen Methoden

	@ApiNoContentResponse({ description: 'User  with {id} deleted successfully' })
	@ApiNotFoundResponse({ description: 'User with {id} was not found' })
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		try {
			await this.usersService.remove(id);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}
}
