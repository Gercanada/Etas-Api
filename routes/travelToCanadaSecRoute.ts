import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
// import validaRoles from '../middlewares/validar-roles';
import { deletePersonalInfoSec, getPersonalInfoSec, getPersonalInfoSecs, putPersonalInfoSec } from '../controllers/personalInfoSecController';
import { deleteTravelToCanadaSec, getTravelToCanadaSec, getTravelToCanadaSecs, putTravelToCanadaSec } from '../controllers/travelToCanadaSecController';

const router = Router();

router.get('/',
    [validarJWT],
    getTravelToCanadaSec,);

    
router.get('/:id', [
    validarJWT,
   // esAdminRole,
   // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
  // check('id', 'No es un ID válido').isMongoId(),
   // check('id').custom(existeUsuarioPorId),
   validarCampos
], getTravelToCanadaSecs);

router.put('/:id', [
    validarJWT,
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], putTravelToCanadaSec);

router.delete('/:id', [
     validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
   // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteTravelToCanadaSec);

export default router;