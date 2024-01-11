import { DataTypes } from 'sequelize';
import db from '../db/connection';


const StatusiiSec = db.define('status_ii_sec', {
    country_residence: {

        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    zip_code: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    occupation_id: {
        type: DataTypes.INTEGER
    },
    job_location: {
        type: DataTypes.STRING
    },
    company_name: {
        type: DataTypes.STRING
    },
    // company: {
    //     type: DataTypes.STRING
    // },
    worked_time: {
        type: DataTypes.STRING
    },
    permit_for_canada: {
        type: DataTypes.BOOLEAN
    },
    is_completed: {
        type: DataTypes.BOOLEAN
    }}
    ,{
        tableName: 'status_ii_sec'
      });

export default StatusiiSec;
