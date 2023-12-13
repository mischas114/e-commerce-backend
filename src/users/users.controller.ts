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
	UseGuards,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
export interface UserWithoutPassword extends Omit<User, 'password'> {}

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
	async getUsers(@Query('name') name?: string): Promise<UserWithoutPassword[]> {
		if (name) {
			return this.usersService.findByName(name);
		}
		return this.usersService.findAll();
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	@UseGuards(JwtAuthGuard)
	@Get('id/:id')
	async findOneById(@Param('id') id: string): Promise<User> {
		const user = await this.usersService.findOneById(id);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@ApiOkResponse({ type: User })
	@ApiNotFoundResponse()
	@Get('email/:email')
	async findOneByEmail(@Param('email') email: string): Promise<User> {
		const user = await this.usersService.findOneByEmail(email);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return user;
	}

	@ApiNoContentResponse({ description: 'User with {email} updated successfully' })
	@ApiNotFoundResponse({ description: 'User with {email} was not found' })
	@Patch(':email')
	async update(
		@Param('email') email: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<void> {
		await this.usersService.update(email, updateUserDto);
	}

	@ApiOkResponse({ description: 'User  with {id} deleted successfully' })
	@ApiNotFoundResponse({ description: 'User with {id} was not found' })
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		const deletedUser = await this.usersService.remove(id);
		if (!deletedUser) {
			throw new NotFoundException(`User with ID ${id} was not found`);
		}
	}
}
