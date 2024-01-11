import { DataTypes } from 'sequelize';
import db from '../db/connection';
import PersonalInfoSec from './personalInfoSecModel';


const Genders = db.define('genderpicklist', {
    valor: {
        type: DataTypes.STRING
    }
},{
    tableName: 'genderpicklist',

    timestamps: false,
  })

PersonalInfoSec.belongsTo(Genders, { foreignKey: 'gender_id', as: 'gender' });

export default Genders;