"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        console.log('payload', payload);
        jsonwebtoken_1.default.sign(payload, 'Fi3r0@l0om1ed0331106', {
            expiresIn: '4h',
        }, (err, token) => {
            if (err) {
                console.log('aqui toy1');
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                console.log('aqui toy2');
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
//# sourceMappingURL=generar-jwt.js.map