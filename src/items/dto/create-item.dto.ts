import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsPositive, MaxLength } from 'class-validator';

export class CreateItemDto {
	@ApiProperty({ example: 'Clear Whey Isolat', type: String })
	name: string;

	@MaxLength(100)
	@ApiProperty({ example: '500g; Hergestellt in Ubugdu', type: String })
	description: string;

	@IsPositive()
	@ApiProperty({ example: 1.3, type: Number })
	price: number;

	@ApiProperty({ example: true, type: Boolean })
	availability: boolean;
}
