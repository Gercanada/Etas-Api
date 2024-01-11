import { Request, Response } from "express";
import PaymentIntent from "../models/PaymentIntentModel";

import * as https from 'https';
import { parseString } from 'xml2js';
import * as querystring from 'querystring';
import { Json } from "sequelize/types/utils";
import { store as storePaymentIntent } from "./PaymentIntentController";

// const stripe = require('stripe')(process.env.STRIPE_SECRET ?? 'sk_test_51IW5C7JFpQqnD8HRoQYUZGJ40oaWhgQYSqaOcPPIWMK7lq6fDzo98stP2UsQW9qrNRHrSHUBScNu4x7evkWaleUb00bEJbd1so');

export const index = async (req: Request, res: Response) => {
    try {
        const stripe = require('stripe')('sk_test_51IW5C7JFpQqnD8HRoQYUZGJ40oaWhgQYSqaOcPPIWMK7lq6fDzo98stP2UsQW9qrNRHrSHUBScNu4x7evkWaleUb00bEJbd1so');
        const products = await stripe.products.list({ limit: 3, });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error });
    }
}


export const store = async (req: Request, res: Response) => {
    try {
        //create 
    } catch (error) {
        res.status(500).json({
            error: `No pending etas`
        });
    }
}

export const show = async (req: Request, res: Response) => {
    const { id } = req.params;

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
    const { id } = req.params;
    try {
        const eta = await PaymentIntent.findAll({ where: { id: id } });
        // Delete record 
        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }

}


export const newOxxoSession = async (req: Request, res: Response) => {
    try {
        const stripe = require('stripe')('sk_test_51IW5C7JFpQqnD8HRoQYUZGJ40oaWhgQYSqaOcPPIWMK7lq6fDzo98stP2UsQW9qrNRHrSHUBScNu4x7evkWaleUb00bEJbd1so');

        console.log({ params: req.params });
        const { eta_id, id, currency } = req.params;

        const methods = [];

        if (currency === 'mxn') {
            methods.push('oxxo');
            methods.push('card');
        }
        if (currency === 'usd') {
            methods.push('link');
            methods.push('card');
        }
        if (currency === 'cad') {

            methods.push('link');
            methods.push('card');
        }

        const session = await stripe.checkout.sessions.create({
            currency: currency ?? 'usd',

            payment_method_types: methods/*  ['oxxo', 'card'] */, //card 
            line_items: [{
                price: id,
                quantity: 1,
            }],

            metadata: {
                eta_id: eta_id
            },
            mode: 'payment',
            // success_url: 'https://tusitio.com/success',
            // cancel_url: 'https://tusitio.com/cancel',
            success_url: process.env.APP_URL + '/api/payments/' + eta_id + '/success_paid',
            cancel_url: process.env.APP_URL + '/api/payments/failed_pay',
            //! test https://163e-189-143-174-180.ngrok-free.app/api/payments/stripe/1/price_1OWphbJFpQqnD8HRInCZoMqL/mxn
        });

        // console.log(session.id);

        res.send(`
        <!DOCTYPE html>
        <html> 
          <head>
            <title>Pago con OXXO</title>
            <script src="https://js.stripe.com/v3/"></script>
          </head>
          <body>
            Redireccionando a Stripe...
            <script>
              var stripe = Stripe('pk_test_51IW5C7JFpQqnD8HRQFJc7lguyM6WgyUc3Rc5mwEvRYhxGHHpHfbAUuaFyp3UHtnIGlsA5xYzciL6i8hg3ZbYy6E000kYAimBeN');
              window.onload = function() {
                stripe.redirectToCheckout({ sessionId: '${session.id}' })
                .then(function (result) {
                  if (result.error) {
                    alert(result.error.message);
                  }
                });
              }; 
            </script>
          </body>
        </html> 
      `);
        // res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error });
    }

}

export const successPay = (req: Request, res: Response) => {
    try {
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Pago exitoso ! </title>
          </head>
          <body>
           El intento de fue exitoso :) 
          </body>
        </html>
      `);
    } catch (error) {
        console.error({ successPayError: error });
        res.status(500).send('Error interno del servidor');

    }
}


export const failedPay = (res: Response) => {
    try {
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Pago fallido :(</title>
          </head>
          <body>
          <h1>Valio burger</h1>
          <h3> El pago no se completo . </h3>
               </body>
        </html>
      `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');

    }
}


export const newConvergePayment = async (req: Request, res: Response) => {
    try {
        const { params, query, body } = req;
        /*     res.json([params, query, body]);
            return; */

        //* CONVERGE FIXED DATA
        const ssl_merchant_id: string | any = process.env.CONVERGE_MERCHANT_ID;
        const ssl_user_id: string | any = process.env.CONVERGE_SSL_USER;
        const ssl_pin: string | any = process.env.CONVERGE_SSL_PIN;
        const convergeUrl: string | any = process.env.CONVERGE_MERCHANT_URL;
        const ssl_transaction_type: string | any = 'CCSALE';

        //* Selected currency !default usd 
        const transaction_currency: string | any = query.currency;
        const ssl_transaction_currency: string | any = transaction_currency ?? 'USD';

        //* Customer card data
        const ssl_card_number: string | any = body?.card_no;
        const ssl_exp_date: string | any = body?.exp_date;
        const ssl_amount: string | any = body?.amount;
        const ssl_cvv2cvc2: string | any = body?.cvv;
        //* Customer billing data
        const ssl_avs_address: string | any = body?.avs_address;
        const ssl_avs_zip: string | any = body?.avs_zip;
        // const ssl_invoice_number: string | any = body?.ssl_invoice_number;
        const ssl_first_name: string | any = body?.first_name;
        const ssl_last_name: string | any = body?.last_name;
        const ssl_email: string | any = body?.email;
        const ssl_city: string | any = body?.city;
        const ssl_state: string | any = body?.state;
        const ssl_country: string | any = body?.country;
        const ssl_description: string | any = body?.description;

        let xmlData = `<txn>
        <ssl_merchant_id>${ssl_merchant_id}</ssl_merchant_id>
        <ssl_user_id>${ssl_user_id}</ssl_user_id>
        <ssl_pin>${ssl_pin}</ssl_pin>
        <ssl_transaction_type>${ssl_transaction_type}</ssl_transaction_type>
        <ssl_card_number>${ssl_card_number}</ssl_card_number>
        <ssl_exp_date>${ssl_exp_date}</ssl_exp_date>
        <ssl_amount>${ssl_amount}</ssl_amount>
        <ssl_cvv2cvc2>${ssl_cvv2cvc2}</ssl_cvv2cvc2>
        <ssl_cvv2cvc2_indicator>1</ssl_cvv2cvc2_indicator>
        <ssl_avs_address>${ssl_avs_address}</ssl_avs_address>
        <ssl_avs_zip>${ssl_avs_zip}</ssl_avs_zip>
        `;

        // Agregar campos opcionales si están presentes
        // if (ssl_invoice_number) xmlData += `<ssl_invoice_number>${ssl_invoice_number}</ssl_invoice_number>`;
        if (ssl_first_name) xmlData += `<ssl_first_name>${ssl_first_name}</ssl_first_name>`;
        if (ssl_last_name) xmlData += `<ssl_last_name>${ssl_last_name}</ssl_last_name>`;
        if (ssl_email) xmlData += `<ssl_email>${ssl_email}</ssl_email>`;
        if (ssl_city) xmlData += `<ssl_city>${ssl_city}</ssl_city>`;
        if (ssl_state) xmlData += `<ssl_state>${ssl_state}</ssl_state>`;
        if (ssl_country) xmlData += `<ssl_country>${ssl_country}</ssl_country>`;
        if (ssl_description) xmlData += `<ssl_description>${ssl_description}</ssl_description>`;
        // if (ssl_transaction_currency) xmlData += `<ssl_transaction_currency>USD</ssl_transaction_currency>`;
        xmlData += '</txn>';

        await sendPostRequest(xmlData)
            .then(response => {
                console.log('Respuesta call:', response);
                convertXmlToJson(response)
                    .then((json: any) => {
                        if (json.txn) {
                            const resToSave: any = [];
                            for (const [key, value] of Object.entries(json.txn)) {
                                resToSave[key] = value.Length > 1
                                    ? JSON.stringify(value)
                                    : value[0];
                            }
                            storePaymentIntent({ 'converge': (resToSave) }, res.status(200));
                        }

                        res.send('Stored payment');
                    })
                    .catch(error => {
                        console.error('Error al convertir XML a JSON:', error);
                        // res.send(error)
                    });
            })
            .catch(error => {
                console.error('Error :(', error);
            });
    } catch (error) {
        console.log({ newConvergePayment: error })
        res.status(500).json({
            error: `No completed etas`
        });
    }
}


const sendPostRequest = (xmlData: string) => {
    const url = 'https://www.myvirtualmerchant.com/VirtualMerchant/processxml.do';
    const params = querystring.stringify({ xmldata: xmlData });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(params)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let response = '';
            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                console.log('Elavon paid :)');
                // Aquí puedes convertir la respuesta XML a JSON si es necesario
                resolve(response);
            });
        });

        req.on('error', (e) => {
            reject(e);
        });
        req.write(params);
        req.end();
    });
}

const convertXmlToJson = (xml: XMLDocument | any) => {
    return new Promise((resolve, reject) => {
        parseString(xml, (err: any, result: Json) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

