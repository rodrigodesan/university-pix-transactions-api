import { Router } from "express";
import yearController from "../controllers/YearController";

const router = new Router();

router.get('/', yearController.index);
router.get('/show/:id', yearController.show);

export default router;
