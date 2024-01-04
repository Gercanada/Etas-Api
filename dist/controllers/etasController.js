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
exports.deleteEtas = exports.putEtas = exports.postEtas = exports.getUserEtas = exports.getCompletedEta = exports.getPendingEta = exports.getEta = exports.getEtas = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const etasModel_1 = __importDefault(require("../models/etasModel"));
const connection_1 = __importDefault(require("../db/connection"));
const passportSecModel_1 = __importDefault(require("../models/passportSecModel"));
const personalInfoSecModel_1 = __importDefault(require("../models/personalInfoSecModel"));
const statusiiSecModel_1 = __importDefault(require("../models/statusiiSecModel"));
const travelToCanadaSecModel_1 = __importDefault(require("../models/travelToCanadaSecModel"));
const getEtas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const etas = yield etasModel_1.default.findAll();
    res.json({ etas });
});
exports.getEtas = getEtas;
const getEta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eta = yield etasModel_1.default.findByPk(id);
    if (eta) {
        res.json(eta);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getEta = getEta;
const getPendingEta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const eta = yield etasModel_1.default.findAll({
            where: {
                user_id: id,
                isCompleted: false
            }
        });
        if (eta) {
            res.json(eta);
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        res.status(500).json({
            error: `No pending etas`
        });
    }
});
exports.getPendingEta = getPendingEta;
const getCompletedEta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const eta = yield etasModel_1.default.findAll({
            where: {
                user_id: id,
                isCompleted: true
            }
        });
        if (eta) {
            res.json(eta);
        }
        else {
            res.json([]);
        }
    }
    catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }
});
exports.getCompletedEta = getCompletedEta;
const getUserEtas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id++++', id);
    const eta = yield etasModel_1.default.findAll({ where: {
            user_id: id
        } });
    console.log("eta----", eta);
    if (eta) {
        res.json(eta);
    }
    else {
        console.log("errorrr");
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
});
exports.getUserEtas = getUserEtas;
const postEtas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield etasModel_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = new etasModel_1.default(body);
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
exports.postEtas = postEtas;
const putEtas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield etasModel_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        const questionsId = yield passportSecModel_1.default.findByPk(passportSec_id);
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putEtas = putEtas;
const deleteEtas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const eta = yield etasModel_1.default.findByPk(id);
    const usuario = yield usersModel_1.default.findOne({
        where: { id: eta === null || eta === void 0 ? void 0 : eta.user_id }
    });
    console.log("etaaaaa", eta);
    const t = yield connection_1.default.transaction();
    const { etas_num } = usuario;
    const deleteEta = etas_num - 1;
    if (!eta) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    try {
        yield etasModel_1.default.destroy({
            where: {
                id: id
            },
            transaction: t
        });
        yield passportSecModel_1.default.destroy({
            where: {
                id: eta.passportSec_id
            },
            transaction: t
        });
        yield personalInfoSecModel_1.default.destroy({
            where: {
                id: eta.personalInfoSec_id
            },
            transaction: t
        });
        yield statusiiSecModel_1.default.destroy({
            where: {
                id: eta.statusIISec_id
            },
            transaction: t
        });
        yield travelToCanadaSecModel_1.default.destroy({
            where: {
                id: eta.travelToCanadaSec_id
            },
            transaction: t
        });
        const usuario = yield usersModel_1.default.findOne({
            where: { id: eta.user_id }
        });
        const deleteEta = usuario.etas_num - 1;
        yield usuario.update({ etas_num: deleteEta }, { transaction: t });
        yield t.commit();
        res.json(eta);
    }
    catch (error) {
        yield t.rollback(); // Revierte la transacción en caso de error
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteEtas = deleteEtas;
//# sourceMappingURL=etasController.js.map