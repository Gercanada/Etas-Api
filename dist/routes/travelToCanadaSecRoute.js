"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const travelToCanadaSecController_1 = require("../controllers/travelToCanadaSecController");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validarJWT], travelToCanadaSecController_1.getTravelToCanadaSec);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], travelToCanadaSecController_1.getTravelToCanadaSecs);
router.put('/:id', [
    validar_jwt_1.validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], travelToCanadaSecController_1.putTravelToCanadaSec);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], travelToCanadaSecController_1.deleteTravelToCanadaSec);
exports.default = router;
//# sourceMappingURL=travelToCanadaSecRoute.js.map