import { Router } from 'express';
import transationController from '../controllers/TransationController';

const router = new Router();

router.get('/', transationController.index);
router.get('/max-avg-state-by-vl-per-qt/:year', transationController.maxAvgStateByTransationVlPerTransationQt);

export default router;
