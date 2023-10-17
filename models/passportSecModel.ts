import { DataTypes } from 'sequelize';
import db from '../db/connection';

const PassportSec = db.define('passportsec', {
    passport_no: {
        type: DataTypes.STRING
    },
    validFrom: {
        type: DataTypes.STRING
    },
    dueDate: {
        type: DataTypes.STRING
    },
    cityOfBirth: {
        type: DataTypes.STRING
    },
    passportCountry: {
        type: DataTypes.STRING
    },
    isCompleted: {
        type: DataTypes.BOOLEAN
    }
}, {
    tableName: 'passportsec'
  });


export default PassportSec;

// id int AI PK 
// id_eta int 
// passport_no text 
// validFrom text 
// dueDate text 
// cityOfBirth text 
// passportCountry text 
// isCompleted tinyint(1) 
// hasGreenCard_id int 
// citizenAnotherCountry_id int 
// maritalSituation_id int