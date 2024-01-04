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
exports.deleteStatusSec = exports.putStatusSec = exports.postStatusSec = exports.getStatusSecs = exports.getStatusSec = void 0;
const travelToCanadaSecModel_1 = __importDefault(require("../models/travelToCanadaSecModel"));
const statusiiSecModel_1 = __importDefault(require("../models/statusiiSecModel"));
const getStatusSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statusII = yield travelToCanadaSecModel_1.default.findAll();
    res.json({ statusII });
});
exports.getStatusSec = getStatusSec;
const getStatusSecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const statusSec = yield statusiiSecModel_1.default.findByPk(id);
    try {
        if (statusSec) {
            res.json(statusSec);
        }
        else {
            res.status(404).json({
                msg: `No existe un statusSec con el id ${id}`
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
exports.getStatusSecs = getStatusSecs;
const postStatusSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.postStatusSec = postStatusSec;
const putStatusSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const statusII = yield statusiiSecModel_1.default.findByPk(id);
        if (!statusII) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield statusII.update(Object.assign({}, body));
        const allFieldsFilled = (statusII.passport_no !== (null || "") &&
            statusII.validFrom !== (null || "") &&
            statusII.dueDate !== (null || "") &&
            statusII.cityOfBirth !== (null || "") &&
            statusII.passportCountry !== (null || "") ? true : false);
        const isCompleted = allFieldsFilled ? true : false;
        yield statusII.update({
            isCompleted: isCompleted
        });
        res.json(statusII);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putStatusSec = putStatusSec;
const deleteStatusSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteStatusSec = deleteStatusSec;
//# sourceMappingURL=statusiiSecController.js.map