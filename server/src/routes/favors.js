import { Router } from "express";
import { fakeAuth } from "../middleware/fakeAuth.js";
import { getFavors, createFavor, cancelFavor, acceptFavor, getMyAcceptedFavors } from "../controllers/favors.controller.js";

const router = Router();

router.get("/", fakeAuth, getFavors);              
router.get("/accepted", fakeAuth, getMyAcceptedFavors); 
router.post("/", fakeAuth, createFavor);            
router.patch("/:id/cancel", fakeAuth, cancelFavor); 
router.patch("/:id/accept", fakeAuth, acceptFavor);

export default router;