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

import cors from 'cors';

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
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
        this.dbConnection();
        this.middlewares();
        this.routes();
        // listRoutes(th);
    }

    async dbConnection() {

        try {
            await db.authenticate();
            console.log('Database online');

        } catch (error: any) {
            throw new Error(error);
        }

    }

    middlewares() {

        // CORS
        //this.app.use(cors());
        const corsOptions = {
            origin: 'http://localhost:3000',
            methods: 'GET, POST, OPTIONS, PUT, DELETE',
            allowedHeaders: 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
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

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }

}

export default Server;