import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import { aiEvaluateContr } from "../controllers/aiEvaluate.contr.js";
import { countryVisasContr } from "../controllers/countryVisas.contr.js";
import multer from "multer";
const router: ExpressRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/ai-evaluate", upload.single("file"), aiEvaluateContr);
router.get("/country-visas", countryVisasContr);

export default router;