import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('users', {
    first_name: {
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
    etas_num: {
        type: DataTypes.INTEGER
    },
},{
    tableName: 'users'
  });


export default Usuario;