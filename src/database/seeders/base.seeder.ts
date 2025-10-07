
import { DataSource } from 'typeorm';

export abstract class BaseSeeder {
  abstract run(dataSource: DataSource): Promise<void>;
}