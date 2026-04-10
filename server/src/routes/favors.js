import { Router } from "express";
import { fakeAuth } from "../middleware/fakeAuth.js";
import { getFavors, createFavor, cancelFavor } from "../controllers/favors.controller.js";

const router = Router();

router.get("/", fakeAuth, getFavors);              
router.post("/", fakeAuth, createFavor);            
router.patch("/:id/cancel", fakeAuth, cancelFavor); 

export default router;