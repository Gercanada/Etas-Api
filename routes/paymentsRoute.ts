import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares/validar-campos';
import { validarJWT } from '../middlewares/validar-jwt';
// import validaRoles from '../middlewares/validar-roles';

import {
    getUsuario, getUsuarios, postUsuario,
    putUsuario, deleteUsuario
} from '../controllers/usersController';

import { emailExiste, existeUsuarioPorId } from '../helpers/db-validators';
import { list } from '../controllers/paymentsController';

import { failedPay, newConvergePayment, newOxxoSession, successPay } from '../controllers/StripeProductController';
import { conektaWebhookEvents, newPaymentLink } from '../controllers/ConektaController';
import {
    newCheckoutSession,
    processPayment,
    webhookEvents as mercadopagoWebhookEvents,
    payments,
    newPayment,
    checkoutBackend,
    newPaymentBrick,
    merchantOrders,
    payment,
    backUrl,
    notificationUrl
} from '../controllers/MercadoPagoController';
import { index, sendMailTrap } from '../controllers/PaymentIntentController';


const router = Router();

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get payment information
 *     description: Retrieves payment information. Requires authentication.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment information retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get('/', [validarJWT], index);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update payment
 *     description: Update payment information by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Server error
 */
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], putUsuario);

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create new payment
 *     description: Create a new payment record
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
], postUsuario);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete payment
 *     description: Delete a payment record by ID. Requires authentication.
 *     tags: [Payments]
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
 *         description: Payment deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', [
    validarJWT,
    validarCampos
], deleteUsuario);

/**
 * @swagger
 * /api/payments/stripe/{eta_id}/{id}/{currency}:
 *   get:
 *     summary: Create Stripe OXXO payment session
 *     description: Creates a new OXXO payment session via Stripe
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: eta_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: currency
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OXXO session created successfully
 *       500:
 *         description: Server error
 */
router.get('/stripe/:eta_id/:id/:currency', [], newOxxoSession);

/**
 * @swagger
 * /api/payments/converge/{eta_id}/{id}:
 *   post:
 *     summary: Create Converge/Elavon payment
 *     description: Creates a new payment via Converge/Elavon
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: eta_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment created successfully
 *       500:
 *         description: Server error
 */
router.post('/converge/:eta_id/:id', [], newConvergePayment);

/**
 * @swagger
 * /api/payments/{eta_id}/success_paid:
 *   get:
 *     summary: Payment success callback
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: eta_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success callback processed
 */
router.get('/:eta_id/success_paid', [], successPay);

/**
 * @swagger
 * /api/payments/failed_pay:
 *   get:
 *     summary: Payment failure callback
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Failure callback processed
 */
router.get('/failed_pay', [], failedPay);

/**
 * @swagger
 * /api/payments/conekta:
 *   get:
 *     summary: Create Conekta payment link
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment link created successfully
 */
router.get('/conekta', [], newPaymentLink);

/**
 * @swagger
 * /api/payments/conekta/webhooks:
 *   post:
 *     summary: Conekta webhook endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 */
router.post('/conekta/webhooks', [], conektaWebhookEvents);

/**
 * @swagger
 * /api/payments/mercadopago/payments/brick:
 *   get:
 *     summary: Create MercadoPago Brick payment
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment created successfully
 */
router.get('/mercadopago/payments/brick/', [], newPaymentBrick);

/**
 * @swagger
 * /api/payments/mercadopago/payments:
 *   post:
 *     summary: Create new MercadoPago payment
 *     tags: [Payments]
 *     responses:
 *       201:
 *         description: Payment created successfully
 */
router.post('/mercadopago/payments', [], newPayment);

/**
 * @swagger
 * /api/payments/mercadopago/webhooks:
 *   post:
 *     summary: MercadoPago webhook endpoint
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 */
router.post('/mercadopago/webhooks', [], mercadopagoWebhookEvents);

/**
 * @swagger
 * /api/payments/mercadopago/checkout:
 *   get:
 *     summary: Create MercadoPago checkout session
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 */
router.get('/mercadopago/checkout', [], newCheckoutSession);

/**
 * @swagger
 * /api/payments/mercadopago/checkout_back:
 *   get:
 *     summary: MercadoPago checkout backend callback
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Callback processed successfully
 */
router.get('/mercadopago/checkout_back', [], checkoutBackend);

/**
 * @swagger
 * /api/payments/mercadopago/process_payment:
 *   post:
 *     summary: Process MercadoPago payment
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment processed successfully
 */
router.post('/mercadopago/process_payment', [], processPayment);

/**
 * @swagger
 * /api/payments/mercadopago/orders:
 *   get:
 *     summary: Get MercadoPago merchant orders
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 */
router.get('/mercadopago/orders', [], merchantOrders);

/**
 * @swagger
 * /api/payments/mercadopago/payments:
 *   get:
 *     summary: Get MercadoPago payment details
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payment details retrieved successfully
 */
router.get('/mercadopago/payments', [], payment);

/**
 * @swagger
 * /api/payments/mercadopago/back_url:
 *   get:
 *     summary: MercadoPago back URL callback
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Callback processed successfully
 */
router.get('/mercadopago/back_url', [], backUrl);

/**
 * @swagger
 * /api/payments/mercadopago/notification_url:
 *   get:
 *     summary: MercadoPago notification URL callback
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Notification processed successfully
 */
router.get('/mercadopago/notification_url', [], notificationUrl);

/**
 * @swagger
 * /api/payments/mailtrap:
 *   get:
 *     summary: Send test email via Mailtrap
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Test email sent successfully
 */
router.get('/mailtrap', [], sendMailTrap);


export default router; 