import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getFavors, createFavor, cancelFavor } from "../controllers/favors.controller.js";

const router = Router();

router.get("/", authenticate, getFavors);
router.post("/", authenticate, createFavor);
router.patch("/:id/cancel", authenticate, cancelFavor); 

export default router;