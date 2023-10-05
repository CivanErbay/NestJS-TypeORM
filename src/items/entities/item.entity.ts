import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';

//Database Entity which creates a table in the database
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  //The constructor accepts a partial item prop to populate the entity with like an argument in a frontend function
  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}
