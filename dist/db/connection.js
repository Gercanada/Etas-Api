"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('etas', 'root', 'password', {
    // host: 'mysql-node',
    dialect: 'mysql',
    host: 'localhost',
    database: 'etas',
    port: 3306,
    // logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map