import express, { Application } from 'express';
import userRoutes from '../routes/usersRoute';
import authRoutes from '../routes/auth';
import etasRoutes from '../routes/etasRoute'
import paymentsRoutes from '../routes/paymentsRoute'
import passportRoutes from '../routes/passportSecRoute'
import personalInfoRoutes from '../routes/personalInfoSecRoute'
import statusRoutes from '../routes/statusiiSecRoute'
import travelToCanadaRoutes from '../routes/travelToCanadaSecRoute'
import listRoutes from '../routes/listRoutes'
import PaymentIntentRoute from '../routes/PaymentIntentRoute'
import stripeProductRoute from '../routes/StripeProductRoute'
import stripeWebhooksRoutes from '../routes/stripeWebhooksRoutes'
import AttachmentRoutes from '../routes/AttachmentRoute'
import { Server as SocketIOServer } from 'socket.io';
import http from 'http'; // Importa el módulo http

import cors from 'cors';

// import db from '../db/connection';



class Server {

    private app: Application;
    private port: string;

    private httpServer: http.Server; // Declara un servidor http
    private io: SocketIOServer; // Declara un servidor Socket.IO
    private apiPaths = {
        usuarios: '/api/users',
        auth: '/api/auth',
        etas: '/api/etas',
        payments: '/api/payments',
        passportSec: '/api/passport-sec',
        personalInfoSec: '/api/personal-sec',
        statusSec: '/api/status-sec',
        travelCanadaSec: '/api/travel-sec',
        routes: '/api/routes',
        paymentintents: '/api/paymentintents',
        stripeproducts: '/api/stripe/products',
        stripewebhooks: '/api/stripe/webhooks',
        attachments: '/api/attachments',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        // this.dbConnection();
        this.middlewares();
        this.routes();
        // listRoutes(th);
        this.httpServer = http.createServer(this.app); // Crea un servidor http a partir de tu aplicación Express
        this.io = new SocketIOServer(this.httpServer); // Crea un servidor Socket.IO a partir del servidor http
    }

    /*   async dbConnection() {
  
          try {
              await db.authenticate();
              console.log('Database online');
  
          } catch (error: any) {
              throw new Error(error);
          }
  
      } */

    middlewares() {

        // CORS
        //this.app.use(cors());
        const corsOptions = {
            // origin: 'http://localhost:3000',
            origin: '*',
            methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
            allowedHeaders: [
                'Origin',
                'Accept',
                // 'Access-Control-Allow-Origin',
                'Access-Control-Allow-Request-Method',
                'Authorization',
                'Content-Type',
                'X-API-KEY',
                'X-Requested-With',
            ],
            credentials: true, // Habilitar credenciales
        };

        this.app.use(cors(corsOptions));


        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }


    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.etas, etasRoutes)
        this.app.use(this.apiPaths.passportSec, passportRoutes)
        this.app.use(this.apiPaths.personalInfoSec, personalInfoRoutes)
        this.app.use(this.apiPaths.statusSec, statusRoutes)
        this.app.use(this.apiPaths.travelCanadaSec, travelToCanadaRoutes)

        this.app.use(this.apiPaths.payments, paymentsRoutes)
        this.app.use(this.apiPaths.routes, listRoutes); //!List all app routes
        this.app.use(this.apiPaths.paymentintents, PaymentIntentRoute);
        this.app.use(this.apiPaths.stripeproducts, stripeProductRoute);
        this.app.use(this.apiPaths.stripewebhooks, stripeWebhooksRoutes);
        this.app.use(this.apiPaths.attachments, AttachmentRoutes);

    }



    // Socket
    listen() {
        // Configura rutas y middleware de tu aplicación Express aquí

        // Configura Socket.IO para escuchar conexiones
        this.io.on('connection', (socket) => {
            console.log('Un cliente se ha conectado a Socket.IO');
            // Aquí puedes configurar lógica para manejar eventos de Socket.IO
            socket.on('disconnect', () => {
                console.log('Un cliente se ha desconectado de Socket.IO');
            });
        });
        // Inicia el servidor http en el puerto especificado
        this.httpServer.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
        /*      this.httpServer.listen(this.port, () => {
                 console.log('Servidor corriendo en puerto ' + this.port);
             }); */
    }


    /*   listen() {
          this.app.listen(this.port, () => {
              console.log('Servidor corriendo en puerto ' + this.port);
          })
      } */

}

export default Server;