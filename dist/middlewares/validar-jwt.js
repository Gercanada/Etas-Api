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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    //const token = req.header('x-token');
    let token;
    if (((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) && ((_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.startsWith('Bearer '))) {
        token = (_e = (_d = req === null || req === void 0 ? void 0 : req.headers) === null || _d === void 0 ? void 0 : _d.authorization) === null || _e === void 0 ? void 0 : _e.substring(7);
    }
    else {
        token = (_f = req === null || req === void 0 ? void 0 : req.headers) === null || _f === void 0 ? void 0 : _f.authorization;
    }
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, 'Fi3r0@l0om1ed0331106'); //aliase
        // leer el usuario que corresponde al uid
        const usuario = yield usersModel_1.default.findByPk(uid);
        console.log('usuarip', usuario);
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB',
            });
        }
        // Verificar si el uid tiene estado true
        if (!(usuario === null || usuario === void 0 ? void 0 : usuario.status)) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false',
            });
        }
        req.usuario = usuario; // Cambio aquí, asignando a req.usuario
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido',
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map