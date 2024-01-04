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
exports.deletePersonalInfoSec = exports.putPersonalInfoSec = exports.postPersonalInfoSec = exports.getPersonalInfoSecs = exports.getPersonalInfoSec = void 0;
const personalInfoSecModel_1 = __importDefault(require("../models/personalInfoSecModel"));
const getPersonalInfoSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personalInfo = yield personalInfoSecModel_1.default.findAll();
    res.json({ personalInfo });
});
exports.getPersonalInfoSec = getPersonalInfoSec;
const getPersonalInfoSecs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const personalSec = yield personalInfoSecModel_1.default.findByPk(id);
    try {
        if (personalSec) {
            res.json(personalSec);
        }
        else {
            res.status(404).json({
                msg: `No existe un PersonalInfoSec con el id ${id}`
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
exports.getPersonalInfoSecs = getPersonalInfoSecs;
const postPersonalInfoSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.postPersonalInfoSec = postPersonalInfoSec;
const putPersonalInfoSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const personalInfo = yield personalInfoSecModel_1.default.findByPk(id);
        if (!personalInfo) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield personalInfo.update(Object.assign({}, body));
        const allFieldsFilled = (personalInfo.fullName !== (null || "") &&
            personalInfo.birthDate !== (null || "") &&
            personalInfo.cityOfBirth !== (null || "") &&
            personalInfo.countryOfBirth !== (null || "") &&
            personalInfo.phone !== (null || "") &&
            personalInfo.gender_id !== (null || "") &&
            personalInfo.email !== (null || "") ? true : false);
        const isCompleted = allFieldsFilled ? true : false;
        yield personalInfo.update({
            isCompleted: isCompleted
        });
        res.json(personalInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putPersonalInfoSec = putPersonalInfoSec;
const deletePersonalInfoSec = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deletePersonalInfoSec = deletePersonalInfoSec;
//# sourceMappingURL=personalInfoSecController.js.map