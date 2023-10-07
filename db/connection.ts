import { Sequelize } from 'sequelize';


const db = new Sequelize('etas', 'root', 'password', {
    // host: 'mysql-node',
     dialect: 'mysql',
    host: 'localhost',
    database: 'etas',
   port: 3306,
    // logging: false,
});

export default db;
