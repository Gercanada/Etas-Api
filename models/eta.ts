import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Eta = db.define('etas', {
    name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    etas_num: {
        type: DataTypes.INTEGER
    },
});


export default Eta;