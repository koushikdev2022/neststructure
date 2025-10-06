import { MigrationInterface, QueryRunner , Table} from "typeorm";

export class CreateProductTable1759757525216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: "product",
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
            },
            {
                name: "price",
                type: "decimal",
                precision: 10,
                scale: 2,
            },
            {
                name: "description",
                type: "text",
                isNullable: true,
            },
            ],
        }),
          true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
