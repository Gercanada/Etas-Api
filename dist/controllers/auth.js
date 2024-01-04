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
exports.token = exports.renovarToken = exports.login = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { body } = req;
    try {
        // return res.json(body.email);
        // Verificar si el email existe
        const usuario = yield usersModel_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        console.log("usuariooopapu", usuario);
        // SI el usuario está activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // return res.json('ok')
        // Generar el JWT
        const token = yield (0, generar_jwt_1.generarJWT)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log({ error });
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.login = login;
const renovarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req;
    // Generar el JWT
    const token = yield (0, generar_jwt_1.generarJWT)(usuario.id);
    res.json({
        usuario,
        token,
    });
});
exports.renovarToken = renovarToken;
const token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.header('Authorization');
        let token;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            token = authorizationHeader.substring(7); // Para eliminar "Bearer " del encabezado
        }
        // console.log({ token })
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición',
            });
        }
        return res.json(token);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido',
        });
    }
});
exports.token = token;
//# sourceMappingURL=auth.js.map