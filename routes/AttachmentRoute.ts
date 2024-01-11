import express, { Router, } from 'express';
import { check } from 'express-validator';
import multer from "multer";

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { listBucketContent, uploadFile } from '../controllers/AttachmentController';
// import validaRoles from '../middlewares/validar-roles';


const router = Router();

const upload = multer(); // Guarda los archivos en la carpeta 'uploads'

// router.get('/', [validarJWT], index,);

router.get('/', [
    //validarCampos
], listBucketContent);
router.post('/', upload.single('file'), [
    //validarCampos
], uploadFile);

export default router;