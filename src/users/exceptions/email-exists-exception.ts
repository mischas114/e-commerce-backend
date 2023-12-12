import { ConflictException } from '@nestjs/common';

export class EmailExistsException extends ConflictException {
	constructor(email: string) {
		super(`User with the Email ${email} already exists`);
	}
}
