
import { Router } from 'express';
import { listRoutes } from '../controllers/routesListController';

const router = Router();
router.get('/', listRoutes,);
export default router;