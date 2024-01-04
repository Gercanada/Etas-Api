"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const statusiiSecController_1 = require("../controllers/statusiiSecController");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validarJWT], statusiiSecController_1.getStatusSec);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], statusiiSecController_1.getStatusSecs);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], statusiiSecController_1.putStatusSec);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], statusiiSecController_1.deleteStatusSec);
exports.default = router;
//# sourceMappingURL=statusiiSecRoute.js.map