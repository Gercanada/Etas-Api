import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Eta = db.define('etas', {

    user_id: {
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
    status_id: {
        type: DataTypes.INTEGER
    },
});
export default Eta;