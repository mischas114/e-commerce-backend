import { NotFoundException } from '@nestjs/common';

export class EmailNotExistsException extends NotFoundException {
	constructor(email: string) {
		super(`Email ${email} not exists`);
	}
}
