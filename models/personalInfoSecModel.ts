import { DataTypes } from 'sequelize';
import db from '../db/connection';

const PersonalInfoSec = db.define('personal_info_sec', {
    full_name: {
        type: DataTypes.STRING
    },
    birthday: {
        type: DataTypes.STRING
    },
    city_of_birth: {
        type: DataTypes.STRING
    },
    country_of_birth: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    gender_id: {
        type: DataTypes.INTEGER
    },
    is_completed: {
        type: DataTypes.BOOLEAN
    }
},{
    tableName: 'personal_info_sec'
  });


export default PersonalInfoSec;

