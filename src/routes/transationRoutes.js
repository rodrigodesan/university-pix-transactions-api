import { Router } from 'express';
import transationController from '../controllers/TransationController';

const router = new Router();

router.get('/', transationController.index);
router.get('/max-min-avg-state-by-vl-per-qt', transationController.maxMinAvgStateByVlPerQt);
router.get('/max-pix-avg-region', transationController.maxPixAvgRegion);
router.get('/pix-by-region', transationController.pixByRegion);
router.get('/cities-with-most-individual-transations', transationController.citiesWithMostIndividualTransations);

export default router;
