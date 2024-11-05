import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
// import validaRoles from '../middlewares/validar-roles';

import { getUsuario, getUsuarios, postUsuario, putUsuario, deleteUsuario } from '../controllers/usersController';
import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/',
    [validarJWT],
    getUsuarios,);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update user information by ID. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password: 
 *                 type: string
 *               etas_num:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id', [
    validarJWT,
    validarCampos
], putUsuario);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a single user by their ID. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', [
    validarJWT,
    validarCampos
], getUsuario);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create new user
 *     description: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *               - etas_num
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               etas_num:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Server error
 */
router.post('/', [
    check('first_name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El apellido es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
], postUsuario);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete a user by ID. Requires authentication.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', [
    validarJWT,
    validarCampos
], deleteUsuario);

export default router;