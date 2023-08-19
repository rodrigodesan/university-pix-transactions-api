import { Router } from 'express';
import transactionController from '../controllers/TransactionController';

const router = new Router();

router.get('/', transactionController.index);
router.get('/show/:id', transactionController.show);
router.get('/max-min-avg-state-by-vl-per-qt', transactionController.maxMinAvgStateByVlPerQt);
router.get('/max-pix-avg-region', transactionController.maxPixAvgRegion);
router.get('/pix-by-region', transactionController.pixByRegion);
router.get('/cities-with-most-individual-transactions', transactionController.citiesWithMostIndividualTransactions);
router.get('/higher-avg-on-vl-company-payer', transactionController.higherAvgOnVlCompanyPayer);
router.get('/cities-diff-in-transaction-vl', transactionController.citiesDifInTransactionVl);
router.get('/highest-transaction-vl-state-year', transactionController.highestTransactionVlStateYear);
router.get('/highest-transaction-vl-region', transactionController.highestTransactionVlRegion);

export default router;
