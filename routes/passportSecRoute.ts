import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
// import validaRoles from '../middlewares/validar-roles';

import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/usersController';
import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators';
import { deleteEtas, getEta, getEtas, getUserEtas, postEtas, putEtas } from '../controllers/etasController';
import { getPassportSec, getPassportsSecs, getUserPassportSec, putUserPassportSec } from '../controllers/passportSecController';

const router = Router();

router.get('/',
    [validarJWT],
    getPassportsSecs,);

    
router.get('/:id', [
    validarJWT,
   // esAdminRole,
   // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
  // check('id', 'No es un ID válido').isMongoId(),
   // check('id').custom(existeUsuarioPorId),
   validarCampos
], getPassportSec);

router.put('/:id', [
    validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], putUserPassportSec);

router.delete('/:id', [
     validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
   // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteEtas);

export default router;