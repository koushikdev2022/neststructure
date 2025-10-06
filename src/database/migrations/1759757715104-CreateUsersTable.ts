import { MigrationInterface, QueryRunner,Table, TableIndex } from "typeorm";

export class CreateUsersTable1759757715104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "20",
            isUnique: true,
          },
          {
            name: "status",
            type: "tinyint",
            default: 1,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "role",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Create indexes for better query performance
    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_EMAIL",
        columnNames: ["email"],
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_PHONE",
        columnNames: ["phone"],
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_STATUS",
        columnNames: ["status"],
      })
    );
  }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("users", "IDX_USERS_STATUS");
        await queryRunner.dropIndex("users", "IDX_USERS_PHONE");
        await queryRunner.dropIndex("users", "IDX_USERS_EMAIL");
        
        // Then drop the table
        await queryRunner.dropTable("users");
    }

}
