import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Item {
	@ApiProperty()
	@Column('varchar')
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column('varchar')
	name: string;

	@ApiProperty()
	@Column('varchar')
	description: string;

	@ApiProperty()
	@Column('varchar')
	price: number;

	@ApiProperty()
	@Column('varchar')
	availability: boolean;

	constructor(item: Partial<Item>) {
		Object.assign(this, item);
	}
}
