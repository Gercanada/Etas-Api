"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
console.log((_a = process.env.DB_PORT) !== null && _a !== void 0 ? _a : 'hasnt');
const dbPort = parseInt(process.env.DB_PORT || '3306');
const dbHost = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'etas';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || 'password';
/* const db = new Sequelize('etas', 'root', 'password', {
    // host: 'mysql-node',
    dialect: 'mysql',
    host: 'localhost',
    database: 'etas',
    port: 3306,
    // logging: false,
}); */
const db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    // host: 'mysql-node',
    dialect: 'mysql',
    host: dbHost,
    database: dbName,
    port: dbPort,
    // logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map