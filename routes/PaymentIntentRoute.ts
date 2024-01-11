import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { index, store, show, update, destroy } from '../controllers/PaymentIntentController';

const router = Router();

router.get('/', [/* validarJWT */], index,);

router.post('/', [
    //validarCampos
], store);

router.get('/:id', [
    validarJWT,
    validarCampos
], show);

router.put('/:id', [
    //check('id', 'No es un ID válido').isMongoId(),
    //validarCampos
], update);


router.delete('/:id', [
    // validarJWT,
], destroy);

export default router;