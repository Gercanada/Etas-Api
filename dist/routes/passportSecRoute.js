"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const etasController_1 = require("../controllers/etasController");
const passportSecController_1 = require("../controllers/passportSecController");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validarJWT], passportSecController_1.getPassportsSecs);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], passportSecController_1.getPassportSec);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], passportSecController_1.putUserPassportSec);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], etasController_1.deleteEtas);
exports.default = router;
//# sourceMappingURL=passportSecRoute.js.map