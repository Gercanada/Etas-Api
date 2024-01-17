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


const router = Router();

router.get('/',
    // [validarJWT],
    list,);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    // check('rol').custom(esRoleValido),
    validarCampos
], putUsuario);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom(esRoleValido),
    //validarCampos
], postUsuario);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    // tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    // check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuario);

//!Stripe
router.get('/stripe/:eta_id/:id/:currency', [
    //check('id', 'No es un ID válido').isMongoId(),
    //validarCampos
], newOxxoSession);

//! Converge/elavon
router.post('/converge/:eta_id/:id', [ //?currency=mxn
], newConvergePayment);

router.get('/:eta_id/success_paid', [], successPay);
router.get('/failed_pay', [], failedPay);

//!Conekta
router.get('/conekta', [ //?currency=mxn //! :eta_id/:id
], newPaymentLink);
router.post('/conekta/webhooks', [], conektaWebhookEvents);


//! Mercadopago
router.get('/mercadopago/payments/brick/', [], newPaymentBrick);


// router.get('/mercadopago/payments', [], payments);
router.post('/mercadopago/payments', [], newPayment);
router.post('/mercadopago/webhooks', [], mercadopagoWebhookEvents);

router.get('/mercadopago/checkout', [], newCheckoutSession);
router.get('/mercadopago/checkout_back', [], checkoutBackend);
router.post('/mercadopago/process_payment', [], processPayment);

router.get('/mercadopago/orders', [], merchantOrders);
router.get('/mercadopago/payments', [], payment);


// back_urls
// notification_url
router.get('/mercadopago/back_url', [], backUrl);
router.get('/mercadopago/notification_url', [], notificationUrl);


export default router; 