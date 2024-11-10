import { DataTypes } from 'sequelize';
import db from '../db/connection';

const AssistantHistory = db.define('assistant_histories', {
    message: {
        type: DataTypes.TEXT,
    },
    message_type: {
        type: DataTypes.STRING,
    },
    assistant_id: {
        type: DataTypes.INTEGER,
    }/* ,
    created_at: {
        type: DataTypes.DATE,
        field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        field: 'updated_at'
    } */
}, {
    timestamps: false
});

export default AssistantHistory;