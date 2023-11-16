import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
	@Column('decimal')
	price: number;

	@ApiProperty()
	@Column('varchar')
	availability: boolean;

	constructor(item: Partial<Item>) {
		Object.assign(this, item);
	}
}
