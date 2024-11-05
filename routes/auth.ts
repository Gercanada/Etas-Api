import { check } from 'express-validator';
import { Router } from 'express';

import { validarCampos } from '../middlewares/validar-campos';
import { UserRegister, login, renovarToken, token } from '../controllers/auth';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);  

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     description: Create a new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Server error
 */
router.post('/register', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], UserRegister);  

/**
 * @swagger
 * /api/auth/token:
 *   get:
 *     summary: Get auth token
 *     description: Get a new authentication token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/token', [
    // validarCampos
],token);

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Renew auth token
 *     description: Renew authentication token for logged in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token renewed successfully
 *       401:
 *         description: Invalid or expired token
 */
router.get('/', validarJWT, renovarToken);
export default router;