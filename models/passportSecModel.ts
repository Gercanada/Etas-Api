import { DataTypes } from 'sequelize';
import db from '../db/connection';

const PassportSec = db.define('passport_sec', {
    passport_no: {
        type: DataTypes.STRING
    },
    passport_img: {
        type: DataTypes.STRING
    },
    valid_from: {
        type: DataTypes.DATE
    },
    due_date: {
        type: DataTypes.STRING
    },
    passport_country: {
        type: DataTypes.STRING
    },
    is_completed: {
        type: DataTypes.BOOLEAN
    },
    has_green_card_id: {
        type: DataTypes.BOOLEAN
    },
    citizen_another_country_id: {
        type: DataTypes.BOOLEAN
    },
    marital_situation_id: {
        type: DataTypes.INTEGER
    },
    section: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'passport_sec'
  });


export default PassportSec;
