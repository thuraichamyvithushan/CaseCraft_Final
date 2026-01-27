import { Router } from "express";
import { getPhoneModels } from "../controllers/phoneModelController.js";

const router = Router();

router.get("/", getPhoneModels);

export default router;


