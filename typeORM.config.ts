import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Item } from './src/items/entities/item.entity';
import { Listing } from './src/items/entities/listing.entity';
import { Tag } from './src/items/entities/tag.entity';
import { Comment } from './src/items/entities/comment.entity';
import { DataSource } from 'typeorm';

config();
//What are typeORM Migrations and why do we need them?
/* Migrations are essential in production when updating your database schema without losing data. Instead of synchronizing the schema directly
in production (unsafe), migrations allow you to create SQL queries to modify the existing schema.
For instance, if you need to rename a column, like changing "title" to "name," you create a migration file with the SQL query:sql
ALTER TABLE "post" ALTER COLUMN "title" RENAME TO "name";
These migration files help maintain your database integrity while adapting to code changes, ensuring smooth transitions between versions. */
// https://orkhan.gitbook.io/typeorm/docs/migrations

//Config Service from NestJs
const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('MYSQL_HOST'),
  port: configService.getOrThrow('MYSQL_PORT'),
  database: configService.getOrThrow('MYSQL_DATABASE'),
  username: configService.getOrThrow('MYSQL_USERNAME'),
  password: configService.getOrThrow('MYSQL_PASSWORD'),
  //In NestJS App we can do the following step automatically by calling autoLoadEntities: true,
  //but here in the typeORM eviroment we need to call all the entities manually, we cannot do it
  //through the DataSource directly
  entities: [Item, Listing, Comment, Tag],
  //Path to the migrations folder - all the files in this folder will be automatically applied to the database
  migrations: ['migrations/**'],
});
