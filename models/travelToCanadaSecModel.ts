import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TravelToCanada = db.define('traveltocanada', {
    whenTravelToCanada: {
        type: DataTypes.STRING
    },
    travelHour: {
        type: DataTypes.STRING
    },
    crimeAnyCountry: {
        type: DataTypes.STRING
    },
    travelPropouse: {
        type: DataTypes.STRING
    },
    moreInfo: {
        type: DataTypes.STRING
    },
    isCompleted: {
        type: DataTypes.BOOLEAN
    }}
    ,{
        tableName: 'traveltocanada'
      });

export default TravelToCanada;

// id int AI PK 
// id_eta int 
// whenTravelToCanada text 
// travelHour text 
// crimeAnyCountry text 
// travelPropouse text 
// moreInfo text 
// isCompleted tinyint(1) 
// deniedEnterCountry_id int 
// hadTuberculosis_id int 
// anyDisease_id int 
// howContactUs_id int