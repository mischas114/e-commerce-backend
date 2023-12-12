import { NotFoundException } from '@nestjs/common';

export class EmailNotExistsException extends NotFoundException {
	constructor(email: string) {
		super(`User with the Email ${email} does not exist`);
	}
}
