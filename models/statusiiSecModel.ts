import { DataTypes } from 'sequelize';
import db from '../db/connection';

const StatusiiSec = db.define('statusiisec', {
    countryResidence: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    zipCode: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    ocupation: {
        type: DataTypes.STRING
    },
    jobLocation: {
        type: DataTypes.STRING
    },
    companyName: {
        type: DataTypes.STRING
    },
    company: {
        type: DataTypes.STRING
    },
    workedTime: {
        type: DataTypes.STRING
    },
    isCompleted: {
        type: DataTypes.BOOLEAN
    }}
    ,{
        tableName: 'statusii'
      });

export default StatusiiSec;

// id int AI PK 
// id_eta int 
// countryResidence text 
// address text 
// zipCode text 
// state text 
// ocupation text 
// jobLocation text 
// companyName text 
// company text 
// workedTime text 
// isCompleted tinyint(1) 
// permitForCanada_id int 
// occupation_id int