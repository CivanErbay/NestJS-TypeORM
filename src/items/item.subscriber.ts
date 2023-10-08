import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';
import { Logger } from '@nestjs/common';

// Event subscriptiongs allow us to listen for events and trigger functions programmatically
//<Item> is the entity we are subscribing to - so we pass it in the EntitySubscriberInterface
@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  //Here we are going to inject the DataSource form typeorm and we call DataSource.subscribers.push to
  //push this class to the subscribers array
  constructor(data: DataSource) {
    data.subscribers.push(this);
  }

  // A listenTo Method that returns the entity we want to listen to (in this case the Item entity)
  listenTo() {
    return Item;
  }

  //At this point there is a bunch of different events we can subscribe to in typeorm
  //List of all events: https://typeorm.io/listeners-and-subscribers#what-is-a-subscriber

  //Item is an InsertEvent of type Item
  beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log('beforeInsert', JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log('afterInsert', JSON.stringify(event.entity));
  }
}
