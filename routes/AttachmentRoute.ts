import { Router, } from 'express';
import multer from "multer";

import { deleteObject,  getObject, listBucketContent, previewObject, uploadFile } from '../controllers/AttachmentController';
// import validaRoles from '../middlewares/validar-roles';


const router = Router();
const upload = multer(); // Guarda los archivos en la carpeta 'uploads'

// router.get('/', [validarJWT], index,);

router.get('/', [
    //validarCampos
], listBucketContent);


router.get('/object', [
    //validarCampos
], getObject);

router.get('/object/preview', [
    //validarCampos
], previewObject);

router.delete('/object', [
    //validarCampos
], deleteObject);


router.post('/', upload.single('file'), [
], uploadFile);

export default router;