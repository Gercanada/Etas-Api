import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('users', {
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


export default Usuario;