import { Router } from "express";
import YearMonthController from "../controllers/YearMonthController";

const router = new Router();

router.get('/', YearMonthController.index);
router.get('/show/:id', YearMonthController.show);

export default router;
