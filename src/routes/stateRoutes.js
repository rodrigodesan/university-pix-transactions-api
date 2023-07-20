import { Router } from "express";
import stateController from "../controllers/StateController";

const router = new Router();

router.get('/', stateController.index);
router.get('/show/:id', stateController.show);

export default router;
