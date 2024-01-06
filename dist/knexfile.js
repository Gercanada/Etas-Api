"use strict";
// knexfile.ts
Object.defineProperty(exports, "__esModule", { value: true });
const dbPort = parseInt(process.env.DB_PORT || '3306');
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'etas';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'password';
const config = {
    development: {
        client: 'mysql', // Asegúrate de cambiar esto a tu cliente de base de datos
        connection: {
            host: dbHost,
            database: dbName,
            user: dbUser,
            password: dbPassword
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'db/migrations'
        }
    }
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map