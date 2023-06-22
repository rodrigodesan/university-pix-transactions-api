import { Router } from "express";
import YearController from "../controllers/YearController";

const router = new Router();

router.get('/', YearController.index);

export default router;
