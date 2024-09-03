import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Attachment = db.define('attackments', {
    type: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    path: {
        type: DataTypes.STRING,
    },
    eta_id: {
        type: DataTypes.INTEGER,
    },
});
export default Attachment;