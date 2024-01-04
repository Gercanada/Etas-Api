"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const etas_1 = require("../controllers/etas");
const router = (0, express_1.Router)();
router.get('/', [validar_jwt_1.validarJWT], etas_1.getEtas);
router.get('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], etas_1.getEta);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], etas_1.putEtas);
router.post('/', [
    // check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    // check('email', 'El correo no es válido').isEmail(),
    // check('email').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], etas_1.postEtas);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], etas_1.deleteEtas);
exports.default = router;
//# sourceMappingURL=etas.js.map