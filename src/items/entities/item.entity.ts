import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Listing } from './listing.entity';
import { AbstractEntity } from '../../database/abstract.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';

//Database Entity which creates a table in the database
@Entity()
export class Item extends AbstractEntity<Item> {
  //ince the have the AbstractEntity extension we dont need to generate the id column
  /* @PrimaryGeneratedColumn()
  id: number; */

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  //Demonstrates one-to-one relation
  //Cascade means that the related object (in this case the listing entity) can be inserted or updated in the database
  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  //JoinTable is going to specify this join table that we need to handle the mapping between many items and many tags
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  //The constructor accepts a partial item prop to populate the entity with like an argument in a frontend function
  // Seems not be necessary anymore since the extends AbstractEntity
  /*   constructor(item: Partial<Item>) {
    Object.assign(this, item);
  } */
}
