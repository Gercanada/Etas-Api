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


    private personas;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        // this.dbConnection();
        this.middlewares();
        this.routes();
        // listRoutes(th);
        this.httpServer = http.createServer(this.app); // Crea un servidor http a partir de tu aplicación Express
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        }); // Crea un servidor Socket.IO a partir del servidor http
        this.personas = [];
    }

    // const [personas, setpPrsonas] = useState();
    /*   async dbConnection() {//!db connection  
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
            origin: 'http://localhost:3000',
            // origin: '*',
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


    agregarPersona(id: number | string, nombre: string, sala: string) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;

    }

    getPersona(id) {
        console.log({ this: this.personas })
        let persona = this.personas.filter(persona => persona.id === id)[0];
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }

    crearMensaje = (nombre, mensaje) => {
        return {
            nombre,
            mensaje,
            fecha: new Date().getTime()
        };

    }




    // Socket
    listen() {
        // Configura rutas y middleware de tu aplicación Express aquí
        // Configura Socket.IO para escuchar conexiones
        /*     this.io.on('connection', (socket) => {
                console.log('Un cliente se ha conectado a Socket.IO');
                // Aquí puedes configurar lógica para manejar eventos de Socket.IO
                socket.on('disconnect', () => {
                    console.log('Un cliente se ha desconectado de Socket.IO');
                });
            }); */

        /* interface CallbackResponse {
            error: boolean;
            mensaje: string;
        } */

        this.io.on('connection', (client) => {
            console.log('Un cliente se ha conectado a Socket.IO');
            client.on('entrarChat', (data, callback) => {
                console.log('entraron a sala')
                if (!data.nombre || !data.sala) {
                    return callback({
                        error: true,
                        mensaje: 'El nombre/sala es necesario'
                    });
                }
                client.join(data.sala);
                this.agregarPersona(client.id, data.nombre, data.sala);
                client.broadcast.to(data.sala).emit('listaPersona', this.getPersonasPorSala(data.sala));
                client.broadcast.to(data.sala).emit('crearMensaje', this.crearMensaje('Administrador', `${data.nombre} se unió`));
                callback(this.getPersonasPorSala(data.sala));
            });

            client.on('crearMensaje', (data, callback) => {
                console.log('crearMensaje')
                console.log({ data })
                let persona = this.getPersona(client.id);
                let mensaje = persona ? this.crearMensaje(persona.nombre ?? 'unamed', data.mensaje ?? "no message") : null;
                console.log({ mensaje })

                if (persona && mensaje) {
                    client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
                    if (typeof callback === "function") callback(mensaje);

                }
            });


            client.on('disconnect', () => {
                console.log('disconnect')
                let personaBorrada = this.borrarPersona(client.id);
                if (personaBorrada) {
                    client.broadcast.to(personaBorrada.sala).emit('crearMensaje', this.crearMensaje('Administrador', `${personaBorrada.nombre} salió`));
                    client.broadcast.to(personaBorrada.sala).emit('listaPersona', this.getPersonasPorSala(personaBorrada.sala));
                }


            });

            // Mensajes privados
            client.on('mensajePrivado', data => {
                console.log('mensajePrivado')
                let persona = this.getPersona(client.id);
                client.broadcast.to(data.para).emit('mensajePrivado', this.crearMensaje(persona.nombre, data.mensaje));

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