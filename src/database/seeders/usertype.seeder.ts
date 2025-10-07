import { DataSource } from 'typeorm';
import { UserType } from '../entities/usertype.entity';
import { BaseSeeder } from './base.seeder';

export class UserTypeSeeder extends BaseSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserType);

    const userTypes = [
      { name: 'Admin', status: 1 },
      { name: 'Manager', status: 1 },
      { name: 'User', status: 1 },
      { name: 'Guest', status: 1 },
      { name: 'Moderator', status: 1 },
    ];

    console.log('  🌱 Seeding UserTypes...');

    for (const type of userTypes) {
      const exists = await repo.findOne({ where: { name: type.name } });
      
      if (!exists) {
        const userType = repo.create(type);
        await repo.save(userType);
        console.log(`    ✓ Inserted: ${type.name}`);
      } else {
        console.log(`    - Already exists: ${type.name}`);
      }
    }

    console.log('  ✅ UserType seeding completed!\n');
  }
}