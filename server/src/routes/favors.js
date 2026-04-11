import { Router } from "express";
import { fakeAuth } from "../middleware/fakeAuth.js";
import { getFavors, createFavor, cancelFavor, acceptFavor, getMyAcceptedFavors } from "../controllers/favors.controller.js";

const router = Router();

router.get("/", fakeAuth, getFavors);              // RF-009
router.get("/accepted", fakeAuth, getMyAcceptedFavors); 
router.post("/", fakeAuth, createFavor);            // RF-005
router.patch("/:id/cancel", fakeAuth, cancelFavor); // RF-008
router.patch("/:id/accept", fakeAuth, acceptFavor);

export default router;