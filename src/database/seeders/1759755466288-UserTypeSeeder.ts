import { MigrationInterface, QueryRunner } from "typeorm";
import { UserType } from "../entities/usertype.entity";

export class UserTypeSeeder1759755466288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const repo = queryRunner.manager.getRepository(UserType);

        const userTypes = [
            { name: 'Admin', status: 1 },
            { name: 'Manager', status: 1 },
            { name: 'User', status: 1 },
        ];

        for (const type of userTypes) {
        const exists = await repo.findOne({ where: { name: type.name } });
            if (!exists) {
                await repo.save(repo.create(type));
                console.log(`Inserted: ${type.name}`);
            } else {
                console.log(`Already exists: ${type.name}`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
