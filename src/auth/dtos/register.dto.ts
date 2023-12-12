import { CreateUserDto } from 'src/users/dto/create-user.dto';

//exclude the password field from the CreateUserDto
export class RegisterDto extends CreateUserDto {}
