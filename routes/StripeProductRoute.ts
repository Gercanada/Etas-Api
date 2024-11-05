import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { index } from '../controllers/StripeProductController';
// import validaRoles from '../middlewares/validar-roles';


const router = Router();

router.get('/', [], index,);

/* router.post('/', [
    //validarCampos
], store); */

/* router.get('/:id', [
    validarJWT,
    validarCampos
], show);
 */
/* router.put('/:id', [
    //check('id', 'No es un ID válido').isMongoId(),
    //validarCampos
], update);
 */





/* router.delete('/:id', [
    // validarJWT,
], destroy);
 */
export default router;