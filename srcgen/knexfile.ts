// knexfile.ts

import { Knex } from 'knex';

const dbPort: number = parseInt(process.env.DB_PORT || '3306');
const dbHost: string = process.env.DB_HOST || 'localhost';
const dbName: string = process.env.DB_NAME || 'etas';
const dbUser: string = process.env.DB_USER || 'root';
const dbPassword:string = process.env.DB_PASSWORD || 'password';


const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql', // Asegúrate de cambiar esto a tu cliente de base de datos
    connection: {
      host: dbHost,
      database: dbName,
      user:     dbUser,
      password: dbPassword
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../db/migrations'
    }
  }
};

export default config;
