import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';
import { ItemSubscriber } from './item.subscriber';

@Module({
  //TypeOrmModule.forFeature provides an array of all the entities that are associated with with an item
  imports: [TypeOrmModule.forFeature([Item, Listing, Comment, Tag])],
  providers: [ItemsService, ItemSubscriber],
  controllers: [ItemsController],
})
export class ItemsModule {}
