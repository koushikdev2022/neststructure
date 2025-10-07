// src/database/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

config(); 
const isCompiled = __filename.endsWith('.js');
console.log(isCompiled,"isCompiled")
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql', // or 'postgres', 'sqlite', etc.
  host: process.env.DB_HOST || 'localhost',
  port:  3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nestdb',
  // entities: ['dist/**/*.entity.js'],
   // migrations: ['dist/database/migrations/*.js'],
  entities: [
    isCompiled
      ? 'dist/**/*.entity.js' 
      : __dirname+ '/database/entities/*.entity.ts', 
  ],
    migrations: [
    isCompiled
      ? 'dist/database/migrations/*.js'
      : __dirname + '/database/migrations/*.ts',
  ],
  synchronize: false, 
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;