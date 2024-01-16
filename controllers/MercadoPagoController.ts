import { integer } from "aws-sdk/clients/cloudfront";
import { Request, Response } from "express";
import { mercadopago, MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import https from 'https';
import { Json } from "sequelize/types/utils";
import { Integer } from "aws-sdk/clients/apigateway";
import { resolve } from "path";


const pubKey: string = 'APP_USR-358d7b5f-c94d-4c57-9370-4fc1049081f1';//!production keys
const privateKey: string = 'APP_USR-2330705583522530-011520-bbf199bb7180adf4d7ef0a13d135bb85-1640529364';//!Vendedor
// const pubKey: string = 'TESTUSER1250450050';
// const pubKey: string = 'TEST-bf2d81e5-6487-4a6b-abd3-7b1082419e13';
// const privateKey: string = 'TEST-8421444841947153-011219-87efdb05dfdc2862b6766f7bac2bccf9-439414188';
// const privateKey: string = 'TEST-8421444841947153-011219-87efdb05dfdc2862b6766f7bac2bccf9-439414188';


const appUrl: string = 'https://28ac-189-143-174-180.ngrok-free.app';

const client = new MercadoPagoConfig({
  accessToken: privateKey,
  options:
    { timeout: 5000, idempotencyKey: 'abc' }
});


export const newCheckoutSession = async (req: Request, res: Response) => {
  try {
    const amount: integer = 95000; //amount in cents
    const firstName: string = 'Peter';
    const lastName: string = 'Parker';
    const email: string = 'heriberto.h@gercanada.com';

    const postToRoute: string = appUrl + '/api/payments/mercadopago/process_payment'; //Default takes app.url;

    var now = new Date();
    const expireAt: Date = now.addDays(5);//!Payment link expires in 5 days
    // const expiresAtToUnix: Integer = Math.floor(expireAt.getTime() / 1000);

    const paymentMethods: string = JSON.stringify({
      creditCard: "all",
      debitCard: "all",
      ticket: "all",
      bankTransfer: "all",
      atm: "all",
      onboarding_credits: "all",
      wallet_purchase: "all",
      maxInstallments: 1,
    });

    let preferenceData = {
      items: [
        {
          "title": "Dummy Item",
          "description": "Multicolor Item",
          "currency_id": "$",
          "quantity": 1,
          "unit_price": 10
        }
        /*   {
            id: 'item-ID-1234',
            title: 'Un ejemplo',
            currency_id: 'MXN',
            picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
            description: 'Vamo a ver Gas',
            // category_id: 'art',
            quantity: 1,
            unit_price: 75.76
          } */
      ],
      payer: {
        name: 'João',
        surname: 'Silva',
        email: 'user@email.com',
        phone: {
          area_code: '11',
          number: '3328929396'
        },
        identification: {
          type: 'CPF',
          number: '19119119100'
        },
        address: {
          street_name: 'Street',
          street_number: 123,
          zip_code: '06233200'
        }
      },
      back_urls: {
        success: postToRoute + '?success',
        failure: postToRoute + '?failure',
        pending: postToRoute + '?pending'
      },
      auto_return: 'approved',
      payment_methods: {
        installments: 1,
        // excluded_payment_methods: [],
        // excluded_payment_types: [],
      },
      // notification_url: 'https://www.your-site.com/ipn',
      notification_url: postToRoute + '?notifdication',
      statement_descriptor: 'MEUNEGOCIO',
      external_reference: "default", expires: true,
      expiration_date_from: now.toISOString(), //'2016-02-01T12:00:00.000-04:00',
      expiration_date_to: expireAt.toISOString()//'2016-02-28T12:00:00.000-04:00'
    };

    const preferenceId = await createPreference(preferenceData);

    // if (preferenceId) res.redirect(preferenceId)
    // console.log({ 'here!': preferenceId })


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
                  preferenceId: "${preferenceId}",
               /*    payer: {
                    firstName: "${firstName}",
                    lastName: "${lastName}",
                    email: "${email}",
                  }, */
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



export const checkoutBackend = (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

export const processPayment = async (req: Request, res: Response) => {
  try {
    console.log({ params: req?.params, query: req?.query, body: req?.body, path: req?.path });

    // // if (req?.body?.topic === 'merchant_order') {
    // //   console.log({ topic: req?.body?.topic })
    // //   /*    const merchantOrder: any = getMerchantOrder(req?.body?.resource);
    // //      console.log(JSON.stringify(merchantOrder)); */
    // //   const partes = req?.body?.resource.split('/');
    // //   const orderId = partes.pop();
    // //   const merchantOrder: any = await getMerchantOrder(orderId);
    // //   console.log(({ merchantOrder }));
    // // }

    // res.status(204).json('success');

    // return
    const payment = new Payment(client);
    // Step 4: Create the request object
    const body = {
      transaction_amount: req.body?.transaction_amount ?? 9000,
      description: 'Processing eta payment',
      payment_method_id: req.body?.payment_method_id ?? 'visa',
      token: req.body?.token,
      installments: req.body?.installments,
      issuer_id: req.body?.issuer_id,
      payer: {
        email: req.body?.payer?.email
      },
    };
    // Step 5: Make the request
    payment.create({ body }).then(console.log).catch(console.log);
    // res.send("SuccessPaid")
    // res.status(204).json('success');
  } catch (error) {
    res.status(500).json(error)
    console.log({ processPayment: error })
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

/**
 * 
 * @param req List payments
 * @param res 
 * @returns 
 */
export const payments = (req: Request, res: Response) => {
  try {
    const apikey = 'TEST-8421444841947153-011219-87efdb05dfdc2862b6766f7bac2bccf9-439414188';
    const options = {
      hostname: 'https://api.mercadopago.com/v1/payments/search',
      // path,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
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

    }).catch((err: object | any) => {
      res.json(JSON.parse(err));
    });

  }
  catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}




export const newPayment = (req: Request, res: Response) => {
  try {
    // Step 1: Import the parts of the module you want to use
    // res.send('hy')

    // Step 2: Initialize the client object
    const client = new MercadoPagoConfig({
      accessToken: 'TEST-8421444841947153-011219-87efdb05dfdc2862b6766f7bac2bccf9-439414188',
      options:
        { timeout: 5000, idempotencyKey: 'abc' }
    });

    // Step 3: Initialize the API object
    const payment = new Payment(client);

    // Step 4: Create the request object
    const body = {
      transaction_amount: 95000,
      description: 'Testeando',
      payment_method_id: 'visa',
      token: '7094079fca476c9f8b4337bff89e95bd',
      installments: 1,
      issuer_id: 166,
      payer: {
        email: 'heriberto.h@gercanada.com'
      },
    };

    // Step 5: Make the request
    payment.create({ body }).then(console.log).catch(console.log);

    res.send(201)
  } catch (error) {
    res.status(500).json(error)
  }
}


const createPreference = async (body) => {
  try {
    const preference = new Preference(client);
    const response = await preference.create({ body });
    console.log({ createPreference: response });
    console.log({ api_response: JSON.stringify(response?.api_response.body()) })
    return response.init_point ?? null;
  } catch (error) {
    console.error(error);
  }
};

const getMerchantOrder = async (orderId: string) => {
  try {
    //orderId = https://api.mercadolibre.com/merchant_orders/14970990596
    const options = {
      hostname: 'api.mercadopago.com',
      path: `/merchant_orders/${orderId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + privateKey,
      }
    };
    return new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let responseData = '';
        response.on('data', (chunk) => {
          responseData += chunk;
        });
        response.on('end', () => {
          console.log({ responseData });
          resolve(responseData);
        });
      });

      request.on('error', (error) => {
        console.error(error);
        resolve({ error });
      });

      request.end();
    });
  } catch (error) {
    console.error(error);
  }
};


export const newCheckoutPro = async (req: Request, res: Response) => {
  try {
    const amount: integer = 95000; //amount in cents
    const firstName: string = 'Peter';
    const lastName: string = 'Parker';
    const email: string = 'heriberto.h@gercanada.com';

    const postToRoute: string = `${process.env.APP_URL}/api/payments/mercadopago/process_payment`; //Default takes app.url;

    console.log({ postToRoute })

    var now = new Date();
    const expireAt: Date = now.addDays(5);//!Payment link expires in 5 days
    const expiresAtToUnix: Integer = Math.floor(expireAt.getTime() / 1000);

    const paymentMethods: string = JSON.stringify({
      creditCard: "all",
      debitCard: "all",
      ticket: "all",
      bankTransfer: "all",
      atm: "all",
      onboarding_credits: "all",
      wallet_purchase: "all",
      maxInstallments: 1,
    });

    let preferenceData = {
      items: [
        {
          id: 'item-ID-1234',
          title: 'Meu produto',
          currency_id: 'MXN',
          picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
          description: 'Vamo a ver Gas',
          category_id: 'art',
          quantity: 1,
          unit_price: 75.76
        }
      ],
      payer: {
        name: 'João',
        surname: 'Silva',
        email: 'user@email.com',
        phone: {
          area_code: '11',
          number: '3328929396'
        },
        identification: {
          type: 'CPF',
          number: '19119119100'
        },
        address: {
          street_name: 'Street',
          street_number: 123,
          zip_code: '06233200'
        }
      },
      transaction_amount: 100,
      back_urls: {
        success: postToRoute + '?success',
        failure: postToRoute + '?failure',
        pending: postToRoute + '?pending'
      },
      redirect_urls: {
        success: postToRoute + '?redirect=success',
        failure: postToRoute + '?redirect=failure',
        pending: postToRoute + '?redirect=pending'
      },
      // auto_return: 'approved',
      payment_methods: {
        installments: 1
        // excluded_payment_methods: paymentMethods,
        // excluded_payment_types: [],
      },
      // notification_url: 'https://www.your-site.com/ipn',
      notification_url: postToRoute,
      statement_descriptor: 'MEUNEGOCIO',
      external_reference: 'Reference_1234',
      expires: true,
      expiration_date_from: now.toISOString(), //'2016-02-01T12:00:00.000-04:00',
      expiration_date_to: expireAt.toISOString()//'2016-02-28T12:00:00.000-04:00'
    };

    const preferenceId = await createPreference(preferenceData);
    if (preferenceId) res.redirect(preferenceId)
  } catch (error) {
    res.status(500).json(error)
  }
}


export const newPaymentBrick = async (req: Request, res: Response) => {
  try {
    const body = {
      transaction_amount: 100,
      description: 'Título do produto',
      payment_method_id: 'visa',
      payer: {
        email: 'test@test.com',
        first_name: 'Test',
        last_name: 'User',
        identification: {
          type: 'CPF',
          number: '19119119100'
        },
        address: {
          zip_code: '06233200',
          street_name: 'Av. das Nações Unidas',
          street_number: '3003',
          neighborhood: 'Bonfim',
          city: 'Osasco',
          federal_unit: 'SP'
        }
      }
    };
    const payment = new Payment(client);
    payment.create({ body }).then(response => {
      console.log({ response })
      console.log(response?.body)
    }).catch(console.log);
  } catch (error) {
    res.status(500).json(error)
  }
}



export const merchantOrders = (req: Request, res: Response) => {
  try {
    const orderId = '123123123'; // Reemplaza con el ID de la Merchant Order que deseas consultar

    const options = {
      hostname: 'api.mercadopago.com',
      path: `/merchant_orders/14968364491`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + privateKey,
      }
    };

    const request = https.request(options, (response) => {
      let responseData = '';

      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        // La variable responseData contendrá la respuesta de la API de Mercado Pago
        console.log({ responseData });
        res.status(200).json(JSON.parse(responseData));
      });
    });

    request.on('error', (error) => {
      console.error(error);
      res.status(500).json(error);
    });

    request.end();

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export const paymentIntents = (req: Request, res: Response) => {
  try {
    /* curl -X GET \
      'https://api.mercadopago.com/point/integration-api/payment-intents/{paymentintentid}'\
       -H 'Content-Type: application/json' \
       -H 'x-test-scope: sandbox' \
       -H 'Authorization: Bearer TEST-4599*********755-11221*********d497ae962*********ecf8d85-1*********' \
       
       */
    const paymentintentid = '70468816127';
    const options = {
      hostname: 'api.mercadopago.com',
      path: `/point/integration-api/payment-intents/${paymentintentid}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + privateKey,
      }
    };

    const request = https.request(options, (response) => {
      let responseData = '';

      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        // La variable responseData contendrá la respuesta de la API de Mercado Pago
        console.log({ responseData });
        res.status(200).json(JSON.parse(responseData));
      });
    });

    request.on('error', (error) => {
      console.error(error);
      res.status(500).json(error);
    });

    request.end();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}