import { Request, Response } from "express";
import PaymentIntent from "../models/PaymentIntentModel";

// // const stripe = require('stripe')(process.env.STRIPE_SECRET ?? 'sk_test_51IW5C7JFpQqnD8HRoQYUZGJ40oaWhgQYSqaOcPPIWMK7lq6fDzo98stP2UsQW9qrNRHrSHUBScNu4x7evkWaleUb00bEJbd1so');

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
    // const record = await PaymentIntent.findByPk(id);

    stripe.products.create({
        name: 'Starter Subscription',
        description: '$12/Month subscription',
    }).then(product => {
        stripe.prices.create({
            unit_amount: 1200,
            currency: 'usd',
            recurring: {
                interval: 'month',
            },
            product: product.id,
        }).then(price => {
            console.log('Success! Here is your starter subscription product id: ' + product.id);
            console.log('Success! Here is your starter subscription price id: ' + price.id);
        });
    });


    /*   if (record) {
          res.json(record);
      } else {
          res.status(404).json({
              msg: `No existe un registro con el id ${id}`
          });
      } */
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

        // res.json('here');
        const { id } = req.params;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['oxxo'],
            line_items: [{
                price: id,
                quantity: 1,
            }],
            mode: 'payment',
            // success_url: 'https://tusitio.com/success',
            // cancel_url: 'https://tusitio.com/cancel',
            success_url: 'https://f82d-189-143-174-180.ngrok-free.app',
            cancel_url: 'https://f82d-189-143-174-180.ngrok-free.app',
        });


        console.log(session.id);


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


        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error });
    }

}


