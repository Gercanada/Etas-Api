import { DataTypes } from 'sequelize';
import db from '../db/connection';
import { timeStamp } from 'console';


const Assistant = db.define('assistants', {

    name: {
        type: DataTypes.STRING,
    },
    system_message: {
        type: DataTypes.TEXT,
    },
    model: {
        type: DataTypes.STRING,
    },
    temperature: {
        type: DataTypes.FLOAT,
    },
    max_tokens: {
        type: DataTypes.INTEGER,
    },
    top_p: {
        type: DataTypes.FLOAT,
    },
    stop: {
        type: DataTypes.STRING,
    },
    stream: {
        type: DataTypes.BOOLEAN,
    }
}, {
    timestamps: false
});
export default Assistant;