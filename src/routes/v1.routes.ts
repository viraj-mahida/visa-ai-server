import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { aiEvaluateContr } from "../controllers/aiEvaluate.contr.js";
import { countryVisasContr } from "../controllers/countryVisas.contr.js";
const router: ExpressRouter = Router();

router.post("/ai-evaluate", aiEvaluateContr);
router.get("/country-visas", countryVisasContr);

export default router;