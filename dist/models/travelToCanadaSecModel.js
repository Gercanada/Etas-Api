"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const TravelToCanada = connection_1.default.define('traveltocanada', {
    whenTravelToCanada: {
        type: sequelize_1.DataTypes.STRING
    },
    travelHour: {
        type: sequelize_1.DataTypes.STRING
    },
    crimeAnyCountry: {
        type: sequelize_1.DataTypes.STRING
    },
    travelPropouse: {
        type: sequelize_1.DataTypes.STRING
    },
    moreInfo: {
        type: sequelize_1.DataTypes.STRING
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    tableName: 'traveltocanada'
});
exports.default = TravelToCanada;
// id int AI PK 
// id_eta int 
// whenTravelToCanada text 
// travelHour text 
// crimeAnyCountry text 
// travelPropouse text 
// moreInfo text 
// isCompleted tinyint(1) 
// deniedEnterCountry_id int 
// hadTuberculosis_id int 
// anyDisease_id int 
// howContactUs_id int
//# sourceMappingURL=travelToCanadaSecModel.js.map