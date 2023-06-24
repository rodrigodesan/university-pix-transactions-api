import { Router } from "express";
import StateController from "../controllers/StateController";

const router = new Router();

router.get('/', StateController.index);
router.get('/:id', StateController.show);

export default router;
