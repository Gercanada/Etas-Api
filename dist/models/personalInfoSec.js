"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const PersonalInfoSec = connection_1.default.define('passportsec', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING
    },
    birthDate: {
        type: sequelize_1.DataTypes.STRING
    },
    cityOfBirth: {
        type: sequelize_1.DataTypes.STRING
    },
    countryOfBirth: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    phone: {
        type: sequelize_1.DataTypes.STRING
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = PersonalInfoSec;
// id int AI PK 
// id_eta int 
// fullName text 
// birthDate text 
// cityOfBirth text 
// countryOfBirth text 
// email text 
// phone text 
// isCompleted tinyint(1) 
// gender_id int
//# sourceMappingURL=personalInfoSec.js.map