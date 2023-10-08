import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

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
    //since we create a new instance of the Item entity, and id is auto generated and the new Item constructor type check is working
    const listing = new Listing({ ...createItemDto.listing, rating: 0 });
    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    const item = new Item({ ...createItemDto, comments: [], listing, tags });
    //the entityManager here is not just saving the item entity in its column but its also saving any underlying entity that the item references through its relations.
    //That includes the listing here.
    // When we call save we are actually saving both the item and the listing
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  //By default typeORM is not returning the item with all their relationships (eg without listing) unless you manually tell it to do so.
  async findOne(id: number) {
    //Approach without populating relations
    /* return this.itemsRepository.findOneBy({ id }); */
    //Approach with populating relations
    return this.itemsRepository.findOne({
      where: { id },
      relations: { listing: true, comments: true, tags: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    /*     const item = await this.itemsRepository.findOneBy({ id });
    item.public = updateItemDto.public;
    //Here we loop through comments in the updateItemDto which comes from the controller/frontend and we create a real comment instance out of it for each comment in the dto
    const comments = updateItemDto.comments.map(
      (createCommentDto) => new Comment(createCommentDto),
    );
    item.comments = comments;
    await this.entityManager.save(item); */

    //This transaction method will roll back all changes if any error occurs and nothing will persist
    await this.entityManager.transaction(async (entityManager) => {
      const item = await this.itemsRepository.findOneBy({ id });
      item.public = updateItemDto.public;
      //Here we loop through comments in the updateItemDto which comes from the controller/frontend and we create a real comment instance out of it for each comment in the dto
      const comments = updateItemDto.comments.map(
        (createCommentDto) => new Comment(createCommentDto),
      );
      item.comments = comments;
      await entityManager.save(item);

      //e.g. if I throw an error inside the transaction after the save(item) method is called, the item wont be saved even though the error is thrown afterwards.
      /*  throw new Error(); */

      const tagContent = `${Math.random()}`;
      const tag = new Tag({ content: tagContent });
      await entityManager.save(tag);
    });
  }

  async remove(id: number) {
    return this.itemsRepository.delete(id);
  }
}
