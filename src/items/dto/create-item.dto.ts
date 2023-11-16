import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDecimal,
	IsNotEmpty,
	IsPositive,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateItemDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Clear Whey Isolate', type: String })
	name: string;

	@MaxLength(100)
	@ApiProperty({ example: '500g; Manufactured in Ubugdu', type: String })
	description: string;

	@IsPositive()
	@ApiProperty({ example: 1.3, type: Number })
	price: number;

	@IsBoolean()
	@ApiProperty({ example: true, type: Boolean })
	availability: boolean;
}
