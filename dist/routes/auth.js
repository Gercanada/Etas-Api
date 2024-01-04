"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const validar_campos_1 = require("../middlewares/validar-campos");
const auth_1 = require("../controllers/auth");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos
], auth_1.login);
router.get('/token', [
// validarCampos
], auth_1.token);
router.get('/', validar_jwt_1.validarJWT, auth_1.renovarToken);
exports.default = router;
//# sourceMappingURL=auth.js.map