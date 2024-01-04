"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TravelToCanada = connection_1.default.define('passportsec', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    countryResidence: {
        type: sequelize_1.DataTypes.STRING
    },
    address: {
        type: sequelize_1.DataTypes.STRING
    },
    zipCode: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.STRING
    },
    ocupation: {
        type: sequelize_1.DataTypes.STRING
    },
    jobLocation: {
        type: sequelize_1.DataTypes.STRING
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING
    },
    company: {
        type: sequelize_1.DataTypes.STRING
    },
    workedTime: {
        type: sequelize_1.DataTypes.STRING
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = TravelToCanada;
// id int AI PK 
// id_eta int 
// countryResidence text 
// address text 
// zipCode text 
// state text 
// ocupation text 
// jobLocation text 
// companyName text 
// company text 
// workedTime text 
// isCompleted tinyint(1) 
// permitForCanada_id int 
// occupation_id int
//# sourceMappingURL=statusiiSec.js.map