import { MigrationInterface, QueryRunner,Table, TableIndex } from "typeorm";

export class CreateUserRoleTable1759758852947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
   
    await queryRunner.createTable(
      new Table({
        name: "user_types",
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
            length: "100",
          },
          {
            name: "status",
            type: "tinyint",
            default: 1,
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

    // Create index for better query performance
    await queryRunner.createIndex(
      "user_types",
      new TableIndex({
        name: "IDX_USER_TYPES_NAME",
        columnNames: ["name"],
      })
    );

    await queryRunner.createIndex(
      "user_types",
      new TableIndex({
        name: "IDX_USER_TYPES_STATUS",
        columnNames: ["status"],
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("user_types", "IDX_USER_TYPES_STATUS");
    await queryRunner.dropIndex("user_types", "IDX_USER_TYPES_NAME");
    
    // Then drop the table
    await queryRunner.dropTable("user_types");
    }

}
