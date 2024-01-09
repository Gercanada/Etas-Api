import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { index, store, show, update, destroy, newOxxoSession } from '../controllers/StripeProductController';
// import validaRoles from '../middlewares/validar-roles';


const router = Router();

router.get('/', [], index,);

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



router.get('/oxxo/:id', [
    //check('id', 'No es un ID válido').isMongoId(),
    //validarCampos
], newOxxoSession);


router.delete('/:id', [
    // validarJWT,
], destroy);

export default router;