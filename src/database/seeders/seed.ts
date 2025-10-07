
import dataSource from '../../data-source';
import { UserTypeSeeder } from './usertype.seeder';



interface Seeder {
  run(dataSource: any): Promise<void>;
}
const seeders: Seeder[] = [
  new UserTypeSeeder(),
  

];

async function runSeeders() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🌱 Starting Database Seeding...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    console.log('📡 Connecting to database...');
    await dataSource.initialize();
    console.log('✅ Database connected!\n');


    for (const seeder of seeders) {
      const seederName = seeder.constructor.name;
      console.log(`▶️  Running ${seederName}...`);
      await seeder.run(dataSource);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ All seeders completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('\n❌ Error during seeding:');
    console.error(error);
    throw error;
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Database connection closed.\n');
    }
  }
}

// Run the seeders
runSeeders()
  .then(() => {
    console.log('👍 Seeding process finished successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error during seeding:', error);
    process.exit(1);
  });