import { DataTypes } from 'sequelize';
import db from '../db/connection';

const TravelToCanada = db.define('travel_to_canada_sec', {
    when_travel_to_canada: {
        type: DataTypes.DATE
    },
    travel_hour: {
        type: DataTypes.STRING
    },
    crime_any_country: {
        type: DataTypes.STRING
    },
    travel_propouse: {
        type: DataTypes.STRING
    },
    more_info: {
        type: DataTypes.STRING
    },
    is_completed: {
        type: DataTypes.BOOLEAN
    },
    how_contact_us_id: {
        type: DataTypes.INTEGER
    },
    denied_enter_country: {
        type: DataTypes.INTEGER
    },
    had_tuberculosis: {
        type: DataTypes.BOOLEAN
    },
    section: {
        type: DataTypes.INTEGER
    },
    other: {
        type: DataTypes.BOOLEAN
    },
    other_reason: {
        type: DataTypes.STRING
    },
}
    , {
        tableName: 'travel_to_canada_sec'
    });

export default TravelToCanada;