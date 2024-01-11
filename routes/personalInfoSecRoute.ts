import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
// import validaRoles from '../middlewares/validar-roles';
import { deletePersonalInfoSec, getPersonalInfoSec, getPersonalInfoSecs, putPersonalInfoSec } from '../controllers/personalInfoSecController';

const router = Router();

router.get('/',
    [validarJWT],
    getPersonalInfoSec,);

    
router.get('/:id', [
    validarJWT,
   // esAdminRole,
   // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
  // check('id', 'No es un ID válido').isMongoId(),
   // check('id').custom(existeUsuarioPorId),
   validarCampos
], getPersonalInfoSecs);

router.put('/:id', [
    validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], putPersonalInfoSec);

router.delete('/:id', [
     validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
   // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], deletePersonalInfoSec);

export default router;