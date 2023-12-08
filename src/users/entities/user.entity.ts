import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
export class User {
	@ApiProperty()
	@Column('varchar')
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('varchar')
	firstName: string;

	@ApiProperty()
	@Column('varchar')
	secondName: string;

	@ApiProperty({ required: false })
	@Column('int')
	age?: number;

	@ApiProperty()
	@Column('varchar', { unique: true })
	email: string;

	@ApiProperty()
	@Column('varchar')
	password: string;

	@ApiProperty()
	@Column('varchar')
	permissions: string;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}
