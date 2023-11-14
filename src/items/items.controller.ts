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

	/**
	 * @summary Create a new item
	 * @param {CreateItemDto} createItemDto - The data to create a new item
	 * @returns {Item} The created item
	 */
	@ApiCreatedResponse({ type: Item })
	@ApiNotFoundResponse()
	@Post()
	async create(@Body() createItemDto: CreateItemDto) {
		return this.itemsService.create(createItemDto);
	}

	/**
	 * @summary Get all items
	 * @returns {Item[]} An array of items
	 */
	@ApiOkResponse({ type: Item, isArray: true })
	@Get()
	async findAll() {
		return this.itemsService.findAll();
	}

	/**
	 * @summary Get a specific item by ID
	 * @param {string} id - The ID of the item
	 * @returns {Item} The specified item
	 */
	@ApiOkResponse({ type: Item })
	@ApiNotFoundResponse()
	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.itemsService.findOne(id);
	}

	/**
	 * @summary Update a specific item by ID
	 * @param {string} id - The ID of the item to update
	 * @param {UpdateItemDto} updateItemDto - The data to update the item
	 * @returns {Item} The updated item
	 */
	@ApiNoContentResponse()
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
		return this.itemsService.update(id, updateItemDto);
	}

	/**
	 * @summary Delete a specific item by ID
	 * @param {string} id - The ID of the item to delete
	 * @returns {Item} The deleted item
	 */
	@ApiNoContentResponse()
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.itemsService.remove(id);
	}
}
