import { Router } from "express";
import RegionController from "../controllers/RegionController.";

const router = new Router();

router.get('/', RegionController.index);

export default router;
