import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

//In here we have to methods that will integrating this migrationInterface
export class PublicItems1696787096296 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1696787096296.name);

  //Up method will be called when we want to execute the migrations
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up');
    await queryRunner.query('UPDATE item SET public = 1');
  }
  //Down method will be called when we want to revert the migrations
  public async down(): Promise<void> {
    this.logger.log('Down');
  }
}
