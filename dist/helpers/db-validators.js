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
exports.existeUsuarioPorId = exports.emailExiste = void 0;
// import Role from '../models/role';
const usersModel_1 = __importDefault(require("../models/usersModel"));
// export const esRoleValido = async (rol: string) => {
//   const existeRol = await Role.findOne({ rol });
//   if (!existeRol) {
//     throw new Error(`El rol ${rol} no está registrado en la BD`);
//   }
// };
const emailExiste = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usersModel_1.default.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
});
exports.emailExiste = emailExiste;
const existeUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield usersModel_1.default.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
});
exports.existeUsuarioPorId = existeUsuarioPorId;
//# sourceMappingURL=db-validators.js.map