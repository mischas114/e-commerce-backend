import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

//ToDo Password example zu normalem Passwort (wird gehasht)
export class LoginDto {
	@IsEmail()
	@ApiProperty({ example: 'MaxKarlKopf@gmx.de' })
	readonly email: string;
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'IchBinEinSicheresPasswort123!',
	})
	readonly password: string;
}
