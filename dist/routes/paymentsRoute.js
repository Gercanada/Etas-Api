"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
// import validaRoles from '../middlewares/validar-roles';
const usersController_1 = require("../controllers/usersController");
const db_validators_1 = require("../helpers/db-validators");
const paymentsController_1 = require("../controllers/paymentsController");
const router = (0, express_1.Router)();
router.get('/', 
// [validarJWT],
paymentsController_1.list);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validar_campos_1.validarCampos
], usersController_1.putUsuario);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom(esRoleValido),
    //validarCampos
], usersController_1.postUsuario);
router.delete('/:id', [
    validar_jwt_1.validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validar_campos_1.validarCampos
], usersController_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=paymentsRoute.js.map