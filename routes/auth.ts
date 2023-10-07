import { check } from 'express-validator';
import { Router } from 'express';

import { validarCampos } from '../middlewares/validar-campos';
import { login } from '../controllers/auth';

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);  

export default router;