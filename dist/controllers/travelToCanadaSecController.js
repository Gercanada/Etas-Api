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
exports.deleteTravelToCanadaSec = exports.putTravelToCanadaSec = exports.postTravelToCanadaSec = exports.getTravelToCanadaSecs = exports.getTravelToCanadaSec = void 0;
const travelToCanadaSecModel_1 = __importDefault(require("../models/travelToCanadaSecModel"));
const getTravelToCanadaSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const travelCanada = yield travelToCanadaSecModel_1.default.findAll();
    res.json({ travelCanada });
});
exports.getTravelToCanadaSec = getTravelToCanadaSec;
const getTravelToCanadaSecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const travelSec = yield travelToCanadaSecModel_1.default.findByPk(id);
    try {
        if (travelSec) {
            res.json(travelSec);
        }
        else {
            res.status(404).json({
                msg: `No existe un travelSec con el id ${id}`
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
exports.getTravelToCanadaSecs = getTravelToCanadaSecs;
const postTravelToCanadaSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.postTravelToCanadaSec = postTravelToCanadaSec;
const putTravelToCanadaSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const travelCanada = yield travelToCanadaSecModel_1.default.findByPk(id);
        if (!travelCanada) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield travelCanada.update(Object.assign({}, body));
        const allFieldsFilled = (travelCanada.passport_no !== (null || "") &&
            travelCanada.validFrom !== (null || "") &&
            travelCanada.dueDate !== (null || "") &&
            travelCanada.cityOfBirth !== (null || "") &&
            travelCanada.passportCountry !== (null || "") ? true : false);
        const isCompleted = allFieldsFilled ? true : false;
        yield travelCanada.update({
            isCompleted: isCompleted
        });
        res.json(travelCanada);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putTravelToCanadaSec = putTravelToCanadaSec;
const deleteTravelToCanadaSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteTravelToCanadaSec = deleteTravelToCanadaSec;
//# sourceMappingURL=travelToCanadaSecController.js.map