import { Integer } from "aws-sdk/clients/apigateway";
import { integer } from "aws-sdk/clients/cloudfront";
import Conekta, { CustomersApi, Configuration, Customer, CustomerResponse } from "conekta";
import { Request, Response } from "express";
import https from 'https';
import querystring from 'querystring';

import { store as storePaymentIntent } from "./PaymentIntentController";

// const sdk = require('api')('@conekta-dev-center/v2.0#257gr3blbbaxaud');

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export const webhookEvents = (req: Request, res: Response) => {
    res.send();
}


export const newPaymentLink = async (req: Request, res: Response) => {

    try {

        const body = req?.query;

        var date = new Date();
        const expireAt: Date = date.addDays(5);//!Payment link expires in 5 days
        const expiresAtToUnix: Integer = Math.floor(expireAt.getTime() / 1000);
        // res.send([expireAt, expiresAtToUnix]);
        // res.send(req.body)
        const productName: string = 'ETA';
        const customerName: string = body.customer_name;
        const customerEmail: string = body?.customer_email;
        const customerPhone: string = body?.customer_phone;
        const productPrice: integer = 95000;


        /*      res.send([productName,
                 customerName,
                 customerEmail,
                 customerPhone,
                 productPrice]); */


        const paymentData: Object = {
            "name": "Payment Link for " + customerName,
            "type": "PaymentLink",
            "recurrent": false,
            "expires_at": expiresAtToUnix,
            "allowed_payment_methods": ["cash", "card", "bank_transfer"],
            "needs_shipping_contact": false,
            "metadata": [{ 'key': 'example values' }],
            "order_template": {
                "line_items": [{
                    "name": customerName,
                    "unit_price": productPrice,//con este valor y quantity se calculará el parámetro amount de la petición
                    "quantity": 1
                }],
                "currency": "MXN",
                "customer_info": {
                    "name": customerName,
                    "email": customerEmail,
                    "phone": customerPhone
                }
            }
        };

        /*   const result = */
        await newCurlRequest(paymentData, '/checkouts').then(
            (result: object | any) => {
                console.log({ url: result })
                const redirectTo: url = JSON.parse(result)?.url;
                if (isValidHttpUrl(redirectTo)) {
                    res.redirect(redirectTo)
                }
            }
        ).catch((err: object | any) => {
            res.json(JSON.parse(err));
        });
    } catch (error) {
        console.log({ error })
        res.status(500).json(error);
    }

}

const isValidHttpUrl = (string: string) => {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}


const apikey = process.env.CONEKTA_KEY ?? 'key_BZ6j7DSRSSvlwRIGBEgHrKf';

const newCurlRequest = (datos: JSON | object, path: string) => {
    const postData = JSON.stringify(datos);
    // path = '/checkouts'
    const options = {
        hostname: 'api.conekta.io',
        path,
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.conekta-v2.1.0+json',
            'Accept-Language': 'es',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(apikey).toString('base64'),
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                resolve(responseData);
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

// Datos para crear un enlace de pago
const datosPago = {
    recurrent: true,
    // Otros datos necesarios para el pago
};



export const conektaWebhookEvents = (req: Request, res: Response) => {
    try {
        if (req.body.data) {
            const resToSave: object = req?.body?.data?.object;
            console.log({ resToSave: JSON.stringify(resToSave) });
            storePaymentIntent({ conekta: resToSave }, res.status(200));
        }
        return;
    } catch (error) {
        console.log({ conektaWebhookEvents: error })
        // res.json(error)

    }

}