import { integer } from "aws-sdk/clients/cloudfront";
import { Request, Response } from "express";


export const newCheckoutSession = (req: Request, res: Response) => {
    const pubKey: string = 'TEST-bf2d81e5-6487-4a6b-abd3-7b1082419e13';
    const privateKey: string = 'TEST-8421444841947153-011219-87efdb05dfdc2862b6766f7bac2bccf9-439414188';


    try {

        const amount: integer = 95000; //amount in cents

        const firstName: string = 'Peter';
        const lastName: string = 'Parker';
        const email: string = 'heriberto.h@gercanada.com';
        const paymentMethods: string = JSON.stringify({
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            atm: "all",
            onboarding_credits: "all",
            wallet_purchase: "all",
            maxInstallments: 1
        });

        const postToRoute: string = '/api/payments/mercadopago/process_payment'; //Default takes app.url;

        const brick = `<html>
        <head>
          <script src="https://sdk.mercadopago.com/js/v2">
          </script>
        </head>
        <body>
          <div id="paymentBrick_container">
          </div>
          <script>
          const mp = new MercadoPago('${pubKey}', {
            locale: 'en-US'
          });
          const bricksBuilder = mp.bricks();
            const renderPaymentBrick = async (bricksBuilder) => {
              const settings = {
                initialization: {
                  amount: ${amount},
                  preferenceId: "<PREFERENCE_ID>",
                  payer: {
                    firstName: "${firstName}",
                    lastName: "${lastName}",
                    email: "${email}",
                  },
                },
                customization: {
                  visual: {
                    style: {
                      theme: "default",
                    },
                  },
                  paymentMethods: ${paymentMethods},
                },
                callbacks: {
                  onReady: () => {
                  },
                  onSubmit: ({ selectedPaymentMethod, formData }) => {
                    // callback when sending data button is clicked
                    return new Promise((resolve, reject) => {
                      fetch("${postToRoute}", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                      })
                        .then((response) => response.json())
                        .then((response) => {
                          // receive payment result
                          resolve();
                        })
                        .catch((error) => {
                          // manage the error answer when trying to create a payment
                          reject();
                        });
                    });
                  },
                  onError: (error) => {
                    // callback called to all error cases related to the Brick
                    console.error(error);
                  },
                },
              };
              window.paymentBrickController = await bricksBuilder.create(
                "payment",
                "paymentBrick_container",
                settings
              );
            };
            renderPaymentBrick(bricksBuilder);
          </script>
        </body>
        </html>
        `;

        res.send(brick);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const processPayment = (req: Request, res: Response) => {
    try {
        console.log({ processPayment: req.body })
        res.status(204).json('success');
    } catch (error) {
        console.log({ error })
    }

}


export const webhookEvents = (req: Request, res: Response) => {
    try {
        console.log('Called mp event')
        console.log({ mercapagowebhookEvents: req.body.data })
        res.status(204).json('success')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}