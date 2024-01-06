"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const Payment = connection_1.default.define('payments', {
/*     user_id: {
        type: DataTypes.INTEGER,
    },
    payment_id: {
        type: DataTypes.INTEGER,
    },
    date_pay: {
        type: DataTypes.DATE
    },
    personalInfoSec_id: {
        type: DataTypes.INTEGER
    },
    passportSec_id: {
        type: DataTypes.INTEGER
    },
    statusIISec_id: {
        type: DataTypes.INTEGER
    },
    travelToCanadaSec_id: {
        type: DataTypes.INTEGER
    },
    eta_name: {
        type: DataTypes.STRING
    },
    isCompleted: {
        type: DataTypes.BOOLEAN
    }, */
});
exports.default = Payment;
//# sourceMappingURL=paymentModel.js.map