import { Router } from 'express';
import { webhookEvents } from '../controllers/StripeWebHookController';
// import validaRoles from '../middlewares/validar-roles';


const router = Router();

router.post('/', [], webhookEvents);
export default router; 