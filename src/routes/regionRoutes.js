import { Router } from "express";
import RegionController from "../controllers/RegionController.";

const router = new Router();

router.get('/', RegionController.index);
router.get('/:id', RegionController.show);

export default router;
