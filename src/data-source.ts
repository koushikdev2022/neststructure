import { DataSource } from 'typeorm';

// import { User } from './database/entities/user.entity';
// import { UserType } from './database/entities/usertype.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
    type: 'mysql', // or 'mysql'
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'testdb',
    entities: [path.join(__dirname, '/database/entities/*.entity.{ts,js}')],
    migrations: [path.join(__dirname, '/database/migrations/*.{ts,js}')],
    // migrations: ['src/migrations/*.ts'],
    synchronize: false,
    
});
