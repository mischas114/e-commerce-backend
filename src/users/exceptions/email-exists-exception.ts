import { ConflictException } from '@nestjs/common';

export class EmailExistsException extends ConflictException {
	constructor(email: string) {
		super(`Email ${email} already exists`);
	}
}
