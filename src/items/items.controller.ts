import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Item } from './entities/item.entity';

@ApiTags('items')
@Controller('items')
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {}

	@ApiCreatedResponse({ type: Item })
	@ApiNotFoundResponse()
	@Post()
	async create(@Body() createItemDto: CreateItemDto) {
		return this.itemsService.create(createItemDto);
	}

	@ApiOkResponse({ type: Item, isArray: true })
	@Get()
	async findAll() {
		return this.itemsService.findAll();
	}

	@ApiOkResponse({ type: Item })
	@ApiNotFoundResponse()
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.itemsService.findOne(id);
	}

	@ApiNoContentResponse()
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
		return this.itemsService.update(id, updateItemDto);
	}

	@ApiNoContentResponse()
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.itemsService.remove(id);
	}
}
