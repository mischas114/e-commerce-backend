import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

//ToDo Password example zu normalem Passwort (wird gehasht)
export class LoginDto {
	@IsEmail()
	@ApiProperty({ example: 'Muster@gmx.de' })
	readonly email: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '044970BDAF4A23535CF60351FF7EF4CDD77EBB60C87C2685145F41B6C0312EE5',
	})
	readonly password: string;
}
