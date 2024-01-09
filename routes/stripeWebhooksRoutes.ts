import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { index, store, show, update, destroy } from '../controllers/StripeProductController';
import { webhookEvents } from '../controllers/StripeWebHookController';
// import validaRoles from '../middlewares/validar-roles';


const router = Router();

router.post('/', [], webhookEvents);
export default router;