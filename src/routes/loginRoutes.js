import { Router } from 'express';
import loginController from '../controllers/LoginController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, loginController.index);
router.post('/', loginController.store);
router.post('/validate', loginController.validate);

export default router;
