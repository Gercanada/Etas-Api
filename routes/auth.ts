import { check } from 'express-validator';
import { Router } from 'express';

import { validarCampos } from '../middlewares/validar-campos';
import { UserRegister, login, renovarToken, token } from '../controllers/auth';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);  

router.post('/register', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], UserRegister);  

router.get('/token', [
    // validarCampos
],token);
router.get('/', validarJWT, renovarToken);
export default router;