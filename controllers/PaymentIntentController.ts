import { Request, Response } from "express";
import PaymentIntent from "../models/PaymentIntentModel";
import Eta from "../models/etasModel";


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

        if (body.object === 'payment_intent') {
            pi_body['platform'] = 'stripe';

            if (body.id) pi_body['paymentintent_id'] = body.id;
            if (body.amount) pi_body['amount'] = body.amount;
            if (body.amount_received) pi_body['amount_received'] = body.amount_received;
            if ((body.charges.data) && (body.charges.data[0]) && 'email' in body.charges.data[0].billing_details) pi_body['email'] = body.charges.data[0].billing_details.email;
            if ((body.charges.data) && (body.charges.data[0]) && 'name' in body.charges.data[0].billing_details) pi_body['name'] = body.charges.data[0].billing_details.name;
            if ((body.charges.data) && (body.charges.data[0]) && 'status' in body.charges.data[0]) pi_body['status'] = body.charges.data[0].status;
            if ('created' in body) pi_body['charge_at'] = new Date(body.created * 1000); //new Date(body.charges.data[0].status * 1000);
            if (body.currency) pi_body['currency'] = body.currency;

            if ((body.charges.data) && (body.charges.data[0]) && 'payment_method_details' in body.charges.data[0]) pi_body['payment_method_type'] = body.charges.data[0].payment_method_details.type;
            if ((body.charges.data) && (body.charges.data[0]) && 'payment_method_details' in body.charges.data[0]) pi_body['payment_method_details'] = JSON.stringify(body.charges.data[0].payment_method_details);
            updateOrCreatePi(pi_body, { 'paymentintent_id': pi_body['paymentintent_id'] });
        }
        
        if (body.object === 'checkout.session') {
            pi_body['platform'] = 'stripe';
            console.log('Update session info');
            const vals: any = [];
            const eta = await Eta.findOne({
                raw: true,
                where: {
                    id: body.metadata.eta_id
                }
            });
            const etaData: Object | null = eta;
            if (etaData?.id) vals['eta_id'] = etaData?.id;
            vals['status'] = body.status;

            //TODO retrieve intent 
            const pi = PaymentIntent.findOne({ raw: true, where: { 'paymentintent_id': body.payment_intent } });
            if (typeof (pi) === undefined) {
                const retrieved: any = retrievePaymentIntent(body.payment_intent);
                vals['amount'] = retrieved?.amount;
                vals['amount_received'] = retrieved?.amount_received;
                vals['email'] = retrieved?.charges?.data[0]?.billing_details?.email;
                vals['name'] = retrieved?.charges?.data[0]?.billing_details?.name;
                vals['charge_at'] = new Date(retrieved?.created * 1000);
            }
            if (body.metadata.eta_id) updateOrCreatePi(vals, { 'paymentintent_id': body.payment_intent });
        }

        if (body.converge) {
            pi_body['platform'] = 'converge';
            const convergePayment = body.converge;
            console.log({ body: (body) })
            if (convergePayment['ssl_txn_id']) pi_body['paymentintent_id'] = convergePayment['ssl_txn_id'];
            if (convergePayment['ssl_amount']) pi_body['amount'] = Math.round(Number(convergePayment['ssl_amount']).toFixed(2) * 100); /* convergePayment['ssl_amount'] */;
            if (convergePayment['ssl_email']) pi_body['email'] = convergePayment['ssl_email'];
            // if (body.id) pi_body['name'] = convergePayment?.ssl_email:;
            if (convergePayment['ssl_card_type']) pi_body['payment_method_type'] = convergePayment['ssl_card_type'];
            if (convergePayment['ssl_result_message']) pi_body['status'] = convergePayment['ssl_result_message'];
            updateOrCreatePi(pi_body, { 'paymentintent_id': pi_body['paymentintent_id'] });
        }

        res.status(201).json('success');

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

                    console.log('Payment created');
                    await payment.save();
                    return payment;


                }
            });

    } catch (error) {
        console.log({ updateOrCreatePi: error });
        return error;
    }
}


const retrievePaymentIntent = async (paymentIntentId: string) => {
    const stripe = require('stripe')('sk_test_51IW5C7JFpQqnD8HRoQYUZGJ40oaWhgQYSqaOcPPIWMK7lq6fDzo98stP2UsQW9qrNRHrSHUBScNu4x7evkWaleUb00bEJbd1so');
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
}

