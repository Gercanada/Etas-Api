"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const PassportSec = connection_1.default.define('passportsec', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    passport_no: {
        type: sequelize_1.DataTypes.STRING
    },
    validFrom: {
        type: sequelize_1.DataTypes.STRING
    },
    dueDate: {
        type: sequelize_1.DataTypes.STRING
    },
    cityOfBirth: {
        type: sequelize_1.DataTypes.STRING
    },
    passportCountry: {
        type: sequelize_1.DataTypes.STRING
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = PassportSec;
// id int AI PK 
// id_eta int 
// passport_no text 
// validFrom text 
// dueDate text 
// cityOfBirth text 
// passportCountry text 
// isCompleted tinyint(1) 
// hasGreenCard_id int 
// citizenAnotherCountry_id int 
// maritalSituation_id int
//# sourceMappingURL=passportSec.js.map