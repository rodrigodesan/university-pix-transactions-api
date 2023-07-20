import { Router } from "express";
import yearMonthController from "../controllers/YearMonthController";

const router = new Router();

router.get('/', yearMonthController.index);
router.get('/show/:id', yearMonthController.show);

export default router;
