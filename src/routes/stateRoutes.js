import { Router } from "express";
import StateController from "../controllers/StateController";

const router = new Router();

router.get('/', StateController.index);

export default router;
