import { Sequelize } from 'sequelize';


const dbPort: number = parseInt(process.env.DB_PORT || '3306');
const dbHost: string = process.env.DB_HOST || 'localhost';
const dbName: string = process.env.DB_NAME || 'etas';
const dbUser: string = process.env.DB_USER || 'root';
const dbPassword:string = process.env.DB_PASSWORD || 'password';




/* const db = new Sequelize('etas', 'root', 'password', {
    // host: 'mysql-node',
    dialect: 'mysql',
    host: 'localhost',
    database: 'etas',
    port: 3306,
    // logging: false,
}); */

const db = new Sequelize(dbName, dbUser, dbPassword, {
    // host: 'mysql-node',
    dialect: 'mysql',
    host: dbHost,
    database: dbName,
    port: dbPort,
    // logging: false,
});

export default db;
