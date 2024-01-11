import { DataTypes } from 'sequelize';
import db from '../db/connection';
import PersonalInfoSec from './personalInfoSecModel';

const Genders = db.define('gender_picklist', {
    value: {
        type: DataTypes.STRING
    }
},{
    tableName: 'gender_picklist',
    timestamps: false,
  })

PersonalInfoSec.belongsTo(Genders, { foreignKey: 'gender_id', as: 'gender' });

export default Genders;