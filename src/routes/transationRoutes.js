import { Router } from 'express';
import transationController from '../controllers/TransationController';

const router = new Router();

router.get('/', transationController.index);
router.get('/show/:id', transationController.show);
router.get('/max-min-avg-state-by-vl-per-qt', transationController.maxMinAvgStateByVlPerQt);
router.get('/max-pix-avg-region', transationController.maxPixAvgRegion);
router.get('/pix-by-region', transationController.pixByRegion);
router.get('/cities-with-most-individual-transations', transationController.citiesWithMostIndividualTransations);
router.get('/higher-avg-on-vl-company-payer', transationController.higherAvgOnVlCompanyPayer);
router.get('/cities-diff-in-transation-vl', transationController.citiesDifInTransationVl);
router.get('/highest-transation-vl-state-year', transationController.highestTransationVlStateYear);
router.get('/highest-transation-vl-region', transationController.highestTransationVlRegion);

export default router;
