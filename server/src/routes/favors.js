import { Router } from "express";
import { fakeAuth } from "../middleware/fakeAuth.js";
import { getFavors, createFavor, cancelFavor, confirmFavorCompletion } from "../controllers/favors.controller.js";

const router = Router();

router.get("/", fakeAuth, getFavors);              
router.post("/", fakeAuth, createFavor);            
router.patch("/:id/cancel", fakeAuth, cancelFavor);
router.patch("/:id/confirm", fakeAuth, confirmFavorCompletion);
export default router;