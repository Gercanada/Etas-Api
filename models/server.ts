import express, { Application } from 'express';
import userRoutes from '../routes/usersRoute';
import authRoutes from '../routes/auth';
import etasRoutes from '../routes/etasRoute'
import passportRoutes from '../routes/passportSecRoute'
import personalInfoRoutes from '../routes/personalInfoSecRoute'
import statusRoutes from '../routes/statusiiSecRoute'
import travelToCanadaRoutes from '../routes/travelToCanadaSecRoute'
import cors from 'cors';

import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/users',
        auth: '/api/auth',
        etas:'/api/etas',
        payments:'/api/payments',
        passportSec:'/api/passport-sec',
        personalInfoSec:'/api/personal-sec',
        statusSec:'/api/status-sec',
        travelCanadaSec:'/api/travel-sec'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            await db.authenticate();
            console.log('Database online');

        } catch (error) {
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
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }

}

export default Server;