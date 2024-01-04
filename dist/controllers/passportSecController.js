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
exports.deleteEtas = exports.putUserPassportSec = exports.postUserPassportSec = exports.getUserPassportSec = exports.getPassportSec = exports.getPassportsSecs = void 0;
const passportSecModel_1 = __importDefault(require("../models/passportSecModel"));
const getPassportsSecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passportSec = yield passportSecModel_1.default.findAll();
    res.json({ passportSec });
});
exports.getPassportsSecs = getPassportsSecs;
const getPassportSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const passportSec = yield passportSecModel_1.default.findByPk(id);
    try {
        if (passportSec) {
            res.json(passportSec);
        }
        else {
            res.status(404).json({
                msg: `No existe un passportSec con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getPassportSec = getPassportSec;
const getUserPassportSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id++++', id);
    try {
        const passportSec = yield passportSecModel_1.default.findAll({
            where: {
                user_id: id
            }
        });
        if (passportSec) {
            res.json(passportSec);
        }
        else {
            console.log("errorrr");
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.getUserPassportSec = getUserPassportSec;
const postUserPassportSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.postUserPassportSec = postUserPassportSec;
const putUserPassportSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const passportSec = yield passportSecModel_1.default.findByPk(id);
        if (!passportSec) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield passportSec.update(Object.assign({}, body));
        const allFieldsFilled = (passportSec.passport_no !== (null || "") &&
            passportSec.validFrom !== (null || "") &&
            passportSec.dueDate !== (null || "") &&
            passportSec.cityOfBirth !== (null || "") &&
            passportSec.passportCountry !== (null || "") ? true : false);
        const isCompleted = allFieldsFilled ? true : false;
        yield passportSec.update({
            isCompleted: isCompleted
        });
        res.json(passportSec);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUserPassportSec = putUserPassportSec;
const deleteEtas = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteEtas = deleteEtas;
//# sourceMappingURL=passportSecController.js.map