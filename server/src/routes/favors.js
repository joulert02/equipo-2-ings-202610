import { Router } from "express";
import { fakeAuth } from "../middleware/fakeAuth.js";
import { getFavors, createFavor, cancelFavor } from "../controllers/favors.controller.js";

const router = Router();

router.get("/", fakeAuth, getFavors);              // RF-009
router.post("/", fakeAuth, createFavor);            // RF-005
router.patch("/:id/cancel", fakeAuth, cancelFavor); // RF-008

export default router;