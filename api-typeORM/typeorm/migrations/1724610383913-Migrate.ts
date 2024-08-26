import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Role } from '../../src/enums/role.enum';

export class Migrate1724610383913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '63',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            length: '127',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
          },
          { name: 'birth_at', type: 'date', isNullable: true },
          {
            name: 'role',
            type: 'int',
            default: Role.User,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

// id int UN AI PK
// name varchar(63)
// email varchar(127)
// birth_at date
// role int
// password varchar(255)
// created_at datetime(6)
// updated_at datetime(6)
