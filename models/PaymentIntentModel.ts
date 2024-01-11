import { DataTypes } from 'sequelize';
import db from '../db/connection';


const PaymentIntent = db.define('payment_intents', {
    stripe_paymentintent_id: {
        type: DataTypes.STRING
    },
    eta_id: {
        type: DataTypes.INTEGER
    },
    amount: {
        type: DataTypes.DOUBLE
    },
    amount_received: {
        type: DataTypes.DOUBLE
    },
    email: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    currency: {
        type: DataTypes.STRING
    },
    payment_method_type: {
        type: DataTypes.STRING
    },
    payment_method_details: {
        type: DataTypes.JSON
    },
    status: {
        type: DataTypes.STRING
    },
    charge_at: {
        type: DataTypes.DATE
    },
}
    , {
        timestamps: false
    }
);
export default PaymentIntent;