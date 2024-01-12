import { DataTypes } from 'sequelize';
import db from '../db/connection';
import PersonalInfoSec from './personalInfoSecModel';

const Eta = db.define('etas', {
     user_id: {
        type: DataTypes.INTEGER,
    },
    // payment_id: {
    //     type: DataTypes.INTEGER,
    // },
    // date_pay: {
    //     type: DataTypes.DATE
    // },
    personal_info_sec_id: {
        type: DataTypes.INTEGER
    },
    passport_sec_id: {
        type: DataTypes.INTEGER
    },
    status_ii_sec_id: {
        type: DataTypes.INTEGER
    },
    travel_to_canada_sec_id: {
        type: DataTypes.INTEGER
    },
    eta_name: {
        type: DataTypes.STRING
    },
    questions_are_completed: {
        type: DataTypes.BOOLEAN
    },
    eta_completed: {
        type: DataTypes.BOOLEAN
    },
    documents: {
        type: DataTypes.BOOLEAN
    },
    needs_documents: {
        type: DataTypes.BOOLEAN
    }, 
});

Eta.belongsTo(PersonalInfoSec, { foreignKey: 'personal_info_sec_id', as: 'personal_info' });


export default Eta;