import { Router } from "express";
import regionController from "../controllers/RegionController.";

const router = new Router();

router.get('/', regionController.index);
router.get('/show/:id', regionController.show);

export default router;
