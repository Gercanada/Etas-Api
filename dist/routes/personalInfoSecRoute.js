"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
// import validaRoles from '../middlewares/validar-roles';
const personalInfoSecController_1 = require("../controllers/personalInfoSecController");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validarJWT], personalInfoSecController_1.getPersonalInfoSec);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], personalInfoSecController_1.getPersonalInfoSecs);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], personalInfoSecController_1.putPersonalInfoSec);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], personalInfoSecController_1.deletePersonalInfoSec);
exports.default = router;
//# sourceMappingURL=personalInfoSecRoute.js.map