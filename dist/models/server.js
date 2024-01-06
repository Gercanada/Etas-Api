"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoute_1 = __importDefault(require("../routes/usersRoute"));
const auth_1 = __importDefault(require("../routes/auth"));
const etasRoute_1 = __importDefault(require("../routes/etasRoute"));
const paymentsRoute_1 = __importDefault(require("../routes/paymentsRoute"));
const passportSecRoute_1 = __importDefault(require("../routes/passportSecRoute"));
const personalInfoSecRoute_1 = __importDefault(require("../routes/personalInfoSecRoute"));
const statusiiSecRoute_1 = __importDefault(require("../routes/statusiiSecRoute"));
const travelToCanadaSecRoute_1 = __importDefault(require("../routes/travelToCanadaSecRoute"));
const listRoutes_1 = __importDefault(require("../routes/listRoutes"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/users',
            auth: '/api/auth',
            etas: '/api/etas',
            payments: '/api/payments',
            passportSec: '/api/passport-sec',
            personalInfoSec: '/api/personal-sec',
            statusSec: '/api/status-sec',
            travelCanadaSec: '/api/travel-sec',
            routes: '/api/routes'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
        // listRoutes(th);
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
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
        this.app.use((0, cors_1.default)(corsOptions));
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usersRoute_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.etas, etasRoute_1.default);
        this.app.use(this.apiPaths.passportSec, passportSecRoute_1.default);
        this.app.use(this.apiPaths.personalInfoSec, personalInfoSecRoute_1.default);
        this.app.use(this.apiPaths.statusSec, statusiiSecRoute_1.default);
        this.app.use(this.apiPaths.travelCanadaSec, travelToCanadaSecRoute_1.default);
        this.app.use(this.apiPaths.payments, paymentsRoute_1.default);
        this.app.use(this.apiPaths.routes, listRoutes_1.default); //!List all app routes
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map