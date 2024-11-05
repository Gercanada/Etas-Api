import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
import { index, store, show, update, destroy } from '../controllers/PaymentIntentController';

const router = Router();

/**
 * @swagger
 * /api/payment-intents:
 *   get:
 *     summary: Get all payment intents
 *     description: Retrieves a list of all payment intents. Requires authentication.
 *     tags: [Payment Intents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payment intents retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/', [validarJWT], index,);

/**
 * @swagger
 * /api/payment-intents:
 *   post:
 *     summary: Create payment intent
 *     description: Creates a new payment intent
 *     tags: [Payment Intents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment intent created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', [
    validarCampos
], store);

/**
 * @swagger
 * /api/payment-intents/{id}:
 *   get:
 *     summary: Get payment intent by ID
 *     description: Retrieve a single payment intent by ID. Requires authentication.
 *     tags: [Payment Intents]
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
 *         description: Payment intent found successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment intent not found
 *       500:
 *         description: Server error
 */
router.get('/:id', [
    validarJWT,
    validarCampos
], show);

/**
 * @swagger
 * /api/payment-intents/{id}:
 *   put:
 *     summary: Update payment intent
 *     description: Update an existing payment intent by ID
 *     tags: [Payment Intents]
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
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment intent updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Payment intent not found
 *       500:
 *         description: Server error
 */
router.put('/:id', [
    validarCampos
], update);

/**
 * @swagger
 * /api/payment-intents/{id}:
 *   delete:
 *     summary: Delete payment intent
 *     description: Delete a payment intent by ID. Requires authentication.
 *     tags: [Payment Intents]
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
 *         description: Payment intent deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment intent not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', [
    validarJWT,
], destroy);

export default router;