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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const etasModel_1 = __importDefault(require("../models/etasModel"));
const passportSecModel_1 = __importDefault(require("../models/passportSecModel"));
const personalInfoSecModel_1 = __importDefault(require("../models/personalInfoSecModel"));
const travelToCanadaSecModel_1 = __importDefault(require("../models/travelToCanadaSecModel"));
const statusiiSecModel_1 = __importDefault(require("../models/statusiiSecModel"));
const connection_1 = __importDefault(require("../db/connection"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usersModel_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usersModel_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usersModel_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = new usersModel_1.default(body);
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(body.password, salt);
        yield usuario.save();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { etas_num } = body;
    const t = yield connection_1.default.transaction();
    console.log("body paupu", body);
    try {
        const usuario = yield usersModel_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield usuario.update(body);
        if (body.etas_num !== undefined && etas_num > 0) {
            console.log('numerico', etas_num);
            if (etas_num > 0) {
                const newEta = yield etasModel_1.default.create({
                    user_id: usuario.id,
                }, { transaction: t });
                const newPassportSec = yield passportSecModel_1.default.create({ transaction: t });
                const personalInfoSec = yield personalInfoSecModel_1.default.create({ transaction: t });
                const newStatusiiSec = yield statusiiSecModel_1.default.create({ transaction: t });
                const newTravelToCanada = yield travelToCanadaSecModel_1.default.create({ transaction: t });
                yield newEta.update({
                    where: {
                        id: newEta.id
                    },
                    eta_name: body.eta_name,
                    travelToCanadaSec_id: newTravelToCanada.id,
                    statusIISec_id: newStatusiiSec.id,
                    passportSec_id: newPassportSec.id,
                    personalInfoSec_id: personalInfoSec.id
                }, { transaction: t });
            }
            // for( let i = 0; i<= etas_num; i++ ){
            //  }
            yield t.commit();
        }
        res.json(usuario);
    }
    catch (error) {
        yield t.rollback();
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usersModel_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    yield usuario.update({ status: false });
    // await usuario.destroy();
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usersController.js.map