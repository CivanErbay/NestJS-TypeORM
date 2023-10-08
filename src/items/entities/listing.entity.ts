import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

//New Entity with its own table in the database
@Entity()
export class Listing extends AbstractEntity<Listing> {
  /*   @PrimaryGeneratedColumn()
  id: number;
 */
  @Column()
  description: string;

  @Column()
  rating: number;

  /*  The constructor function you've defined takes a parameter of type Partial<Listing>.
   In TypeScript, Partial < T > is a utility type that makes all properties of T optional.So, Partial < Listing > means that
   the constructor can accept an object that contains some or all of the properties of the Listing class.
   Inside the constructor, Object.assign(this, listing) is used to copy the properties from the input object (listing) to the new instance of the Listing class.
 */
  /*   constructor(listing: Partial<Listing>) {
    Object.assign(this, listing);
  } */
}
