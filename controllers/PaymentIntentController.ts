import { Request, Response } from "express";
import PaymentIntent from "../models/PaymentIntentModel";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const index = async (req: Request, res: Response) => {

    res.status(200).json('success');
    // res.json({ ahi: 'ta' });
    const data = await PaymentIntent.findAll();
    res.json({ data });
}


/* export const save = async (req: Object, res: Response) => {
    try {
        const { body } = req;
        const payment = new PaymentIntent(body);
        await payment.save();

        console.log('Payment intent stored')
        // res.status(201);
    } catch (error) {
        console.log({ error });           res.status(500).json({
               error: `No pending etas`
           });
    }
} */

export const store = async (req: Request, res: Response) => {
    try {
        const body: any = req;
        const pi_body: any = [];

        if (body.id) pi_body['stripe_paymentintent_id'] = body.id;
        if (body.amount) pi_body['amount'] = body.amount;
        if (body.amount_received) pi_body['amount_received'] = body.amount_received;
        if ((body.charges.data) && (body.charges.data[0]) && 'email' in body.charges.data[0]) pi_body['email'] = body.charges.data[0].email;
        if ((body.charges.data) && (body.charges.data[0]) && 'name' in body.charges.data[0]) pi_body['name'] = body.charges.data[0].name;
        if ((body.charges.data) && (body.charges.data[0]) && 'status' in body.charges.data[0]) pi_body['status'] = body.charges.data[0].status;
        if ('created' in body) pi_body['charge_at'] = new Date(body.created * 1000); //new Date(body.charges.data[0].status * 1000);
        if (body.currency) pi_body['currency'] = body.currency;
        if (body.payment_method_details && body.payment_method_details.type) pi_body['payment_method_type'] = body.payment_method_details.type;
        // console.log({ pi_body });
        // Usage
        const payment = updateOrCreatePi(pi_body, { 'stripe_paymentintent_id': pi_body['stripe_paymentintent_id'] });

        /*  const payment = new PaymentIntent(pi_body);
         await payment.save(); */
        res.status(201);
    } catch (error) {
        console.log({ error });
        res.status(500).json({
            error: `No pending etas`
        });
    }
}

export const show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const record = await PaymentIntent.findByPk(id);
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        });
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const eta = await PaymentIntent.findAll({
            where: {
                id: id,
            }
        });


        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }
}

export const destroy = async (req: Request, res: Response) => {
    const { id } = req.params; try {
        const eta = await PaymentIntent.findAll({ where: { id: id } });

        // Delete record 
        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }

}



//////
const updateOrCreatePi = (values: any, condition: any) => {
    try {

        console.log({ values });
        return PaymentIntent
            .findOne({ where: condition })
            .then(async (obj) => {
                // update
                if (obj) {
                    return obj.update(values);
                } else {
                    // insert
                    const payment = new PaymentIntent(values);
                    await payment.save();


                    /*   obj =   PaymentIntent.create(values);
                         return obj; */

                }
            });

    } catch (error) {
        return error;
        // console.log({ error })
    }
}
