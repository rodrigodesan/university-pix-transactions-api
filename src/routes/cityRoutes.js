import { Router } from "express";
import cityController from "../controllers/CityController";

const router = new Router();

router.get('/', cityController.index);
router.get('/show/:id', cityController.show);

export default router;
