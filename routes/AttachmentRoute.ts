import express, { Router, } from 'express';
import { check } from 'express-validator';
import multer from "multer";

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { deleteObject, downloadObject, getObject, listBucketContent, previewObject, uploadFile } from '../controllers/AttachmentController';
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