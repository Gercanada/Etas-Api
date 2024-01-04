"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Eta = connection_1.default.define('etas', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    payment_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    date_pay: {
        type: sequelize_1.DataTypes.DATE
    },
    personalInfoSec_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    passportSec_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    statusIISec_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    travelToCanadaSec_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    status_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
});
exports.default = Eta;
//# sourceMappingURL=eta.js.map