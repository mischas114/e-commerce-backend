import { ApiProperty } from '@nestjs/swagger';
import {
	IsAlphanumeric,
	IsEmail,
	IsEnum,
	IsHash,
	IsIn,
	IsNumber,
	IsPositive,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateUserDto {
	@IsAlphanumeric()
	@MaxLength(50)
	@ApiProperty({
		example: 'John',
		description: 'First name of the user',
		type: String,
	})
	firstName: string;

	@IsAlphanumeric()
	@MaxLength(50)
	@ApiProperty({
		example: 'Doe',
		description: 'Last name of the user',
		type: String,
	})
	secondName: string;

	@IsNumber()
	@IsPositive()
	@ApiProperty({
		example: 25,
		description: 'Age of the user',
		required: false,
		type: Number,
	})
	age?: number;

	@IsEmail()
	@ApiProperty({
		example: 'john.doe@example.com',
		description: 'Email address of the user',
		type: String,
	})
	email: string;

	@IsHash('sha256')
	@ApiProperty({
		example: 'B2867617492E26C338AB49F72AFABC984D798B59755A27E312B953716AE964D7',
		description: 'SHA-256 hashed password',
		type: String,
	})
	password: string;

	@IsIn(['Premium', 'Standard', 'Admin'])
	@IsAlphanumeric()
	@MaxLength(20)
	@ApiProperty({
		example: 'Premium',
		description: 'User+ permissions ; others: Standard, Admin',
		type: String,
	})
	permissions: string;
}
