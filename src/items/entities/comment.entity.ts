import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  //Specifying the relationship to the owning entity (which is the item that this comment belongs to)
  //ManyToOne returns a type of Item
  //item.comments represents the comment-class
  @ManyToOne(() => Item, (item) => item.comments)
  item: Item;
}
