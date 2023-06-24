import { Router } from "express";
import CityController from "../controllers/CityController";

const router = new Router();

router.get('/', CityController.index);
router.get('/:id', CityController.show);

export default router;
