import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/users.entity';
import LoggerInstance from '../utils/logger';

export const databaseProvider = [
  {
    provide: 'SequelizeInstance',
    useFactory: async () => {
      // @ts-ignore
      const db = new Sequelize({
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        force: false,
        timezone: '+03:00',
      });

      // Test database connection
      db.authenticate()
        .then(() => LoggerInstance.debug('Database connection has been established successfully.'))
        .catch((e: any) => {
          LoggerInstance.error('🔥 Unable to connect to the database: ', e);
          process.exit(1);
        });
      db.addModels([User]);
      await db.sync();
      return db;
    },
  },
];
