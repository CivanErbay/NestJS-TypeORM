import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    //Items repository is returning data from the database
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    // EntityManager is used to perform database operations like writing, updating and deleting records
    private readonly entityManager: EntityManager,
  ) {}

  //createItemDto matches all the properties of the Item entity (name and public)
  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    item.public = updateItemDto.public;
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    return this.itemsRepository.delete(id);
  }
}
