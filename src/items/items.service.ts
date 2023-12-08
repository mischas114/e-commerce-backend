import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
	constructor(
		@InjectRepository(Item)
		private readonly itemsRepository: Repository<Item>,
		//toDO EntityManager löschen?
		private readonly entityManager: EntityManager,
	) {}

	async create(createItemDto: CreateItemDto) {
		const item = new Item(createItemDto);
		await this.entityManager.save(Item, item);
	}

	async findAll() {
		return this.itemsRepository.find();
	}

	async findOne(id: string) {
		return (await this.itemsRepository.findOneBy({ id })) ?? this.itemsRepository.find();
	}

	async update(id: string, updateItemDto: UpdateItemDto) {
		const item = await this.itemsRepository.findOneBy({ id });

		if (!item) {
			throw new NotFoundException();
		}

		Object.assign(item, updateItemDto);

		await this.entityManager.save(Item, item);
	}

	async remove(id: string) {
		await this.itemsRepository.delete(id);
	}
}
