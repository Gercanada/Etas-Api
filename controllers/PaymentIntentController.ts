import { Request, Response } from "express";
import PaymentIntent from "../models/PaymentIntentModel";
import Eta from "../models/etasModel";
import nodemailer from 'nodemailer';


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const index = async (req: Request, res: Response) => {
    const data = await PaymentIntent.findAll();
    res.status(200).json({ data });
}

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
            // const vals: any = [];
            const eta = await Eta.findOne({
                raw: true,
                where: {
                    id: body.metadata.eta_id
                }
            });
            const etaData: Object | null = eta;
            if (etaData?.id) pi_body['eta_id'] = etaData?.id;
            pi_body['status'] = body.status;

            //TODO retrieve intent 
            const pi = PaymentIntent.findOne({ raw: true, where: { 'paymentintent_id': body.payment_intent } });
            if (typeof (pi) === undefined) {
                const retrieved: any = retrievePaymentIntent(body.payment_intent);
                pi_body['amount'] = retrieved?.amount;
                pi_body['amount_received'] = retrieved?.amount_received;
                pi_body['email'] = retrieved?.charges?.data[0]?.billing_details?.email;
                pi_body['name'] = retrieved?.charges?.data[0]?.billing_details?.name;
                pi_body['charge_at'] = new Date(retrieved?.created * 1000);
            }
            if (body.metadata.eta_id) updateOrCreatePi(pi_body, { 'paymentintent_id': body.payment_intent });
        }

        if (body.converge) {
            pi_body['platform'] = 'converge';
            const convergePayment = body.converge;
            // console.log({ body: (body) })
            if (convergePayment['ssl_txn_id']) pi_body['paymentintent_id'] = convergePayment['ssl_txn_id'];
            if (convergePayment['ssl_amount']) pi_body['amount'] = Math.round(Number(convergePayment['ssl_amount']).toFixed(2) * 100); /* convergePayment['ssl_amount'] */;
            if (convergePayment['ssl_email']) pi_body['email'] = convergePayment['ssl_email'];
            // if (body.id) pi_body['name'] = convergePayment?.ssl_email:;
            if (convergePayment['ssl_card_type']) pi_body['payment_method_type'] = convergePayment['ssl_card_type'];
            if (convergePayment['ssl_result_message']) pi_body['status'] = convergePayment['ssl_result_message'];
            updateOrCreatePi(pi_body, { 'paymentintent_id': pi_body['paymentintent_id'] });
        }

        if (body.conekta) {
            const conektaPayment: Object | any = body?.conekta;
            if (conektaPayment.object === 'charge') {
                pi_body['platform'] = 'conekta';
                pi_body['paymentintent_id'] = conektaPayment?.id;
                pi_body['amount'] = conektaPayment?.amount;
                pi_body['email'] = conektaPayment?.customer_info.email;
                pi_body['name'] = conektaPayment?.customer_info.name;
                pi_body['currency'] = conektaPayment?.currency;
                pi_body['payment_method_type'] = conektaPayment?.payment_method?.object;
                pi_body['status'] = conektaPayment?.status;
                pi_body['charge_at'] = new Date(conektaPayment?.paid_at * 1000);
                updateOrCreatePi(pi_body, { 'paymentintent_id': pi_body['paymentintent_id'] });
            }
        }

        if (body.mercadopago) {
            const mercadoPayment: Object | any = JSON.parse(body?.mercadopago);
            // console.log({ mercadoPayment: JSON.parse(mercadoPayment)?.id })
            if (mercadoPayment.operation_type === 'regular_payment') {
                pi_body['platform'] = 'mercadopago';
                pi_body['paymentintent_id'] = mercadoPayment?.id.toString();
                pi_body['amount'] = Math.round(Number(mercadoPayment?.transaction_amount).toFixed(2) * 100);// mercadoPayment?.transaction_amount;
                pi_body['email'] = mercadoPayment?.payer.email;
                pi_body['name'] = mercadoPayment?.payer?.first_name;
                pi_body['currency'] = mercadoPayment?.currency_id;
                pi_body['payment_method_type'] = mercadoPayment?.payment_method?.type;
                pi_body['status'] = mercadoPayment?.status;
                pi_body['charge_at'] = new Date(mercadoPayment?.money_release_date).toISOString();
                // console.log(mercadoPayment?.money_release_date)
                console.log({ pi_body })
                updateOrCreatePi(pi_body, { 'paymentintent_id': pi_body['paymentintent_id'] });
            }
        }

        res.status(201).json('success');
    } catch (error) {
        console.log({ store: error });
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
        console.log({ condition });
        return PaymentIntent
            .findOne({ where: condition })
            .then(async (obj) => {
                // update
                if (obj) {
                    console.log('BE updated');
                    return obj.update(values);
                } else {
                    // insert
                    console.log('BE created');
                    const payment = new PaymentIntent(values);
                    // payment.create(values)
                    console.log('Payment created');
                    await payment.save();
                    // return payment;
                }
            });

    } catch (error) {
        console.log({ updateOrCreatePi: error });
        // return error;
    }
}


const retrievePaymentIntent = async (paymentIntentId: string) => {
    const stripe = require('stripe')('sk_test_51IW5C7JFpQqnD8HRoQYUZGJ40oaWhgQYSqaOcPPIWMK7lq6fDzo98stP2UsQW9qrNRHrSHUBScNu4x7evkWaleUb00bEJbd1so');
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
}


export const sendMailTrap = (req: Request, res: Response) => {

    try {
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: "heriberto.h@gercanada.com",
                pass: "zirbslzdqfuyfahh"
            }
        });

        const mailTo = async () => {
            // send mail with defined transport object

            
            const info = await transport.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "heriberto.h@gercanada.com, heribertolord@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            //
            // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
            //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
            //       <https://github.com/forwardemail/preview-email>
            //
        }
        mailTo().catch(console.error);
        res.status(201).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })

    }
}