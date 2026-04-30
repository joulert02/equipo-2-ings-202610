import { Router } from "express";
// Usamos el middleware REAL de autenticación 
import { authenticate } from "../middleware/authenticate.js";
import { 
  getFavors, 
  createFavor, 
  cancelFavor, 
  acceptFavor, 
  markFavorAsCompleted, 
  getMyAcceptedFavors,
  getMyRequestedFavors, // Agregado
  confirmFavorCompletion // La nueva función 
} from "../controllers/favors.controller.js";

const router = Router();

// Todas las rutas protegidas con authenticate
router.get("/", authenticate, getFavors);
router.post("/", authenticate, createFavor);
router.get("/accepted", authenticate, getMyAcceptedFavors);
router.get("/requested", authenticate, getMyRequestedFavors);
router.patch("/:id/cancel", authenticate, cancelFavor);
router.patch("/:id/accept", authenticate, acceptFavor);

//  Marcar como completado (la hace el que hace el favor)
router.patch("/:id/complete", authenticate, markFavorAsCompleted);

//  Confirmar finalización (la hace el que pidió el favor)
router.patch("/:id/confirm", authenticate, confirmFavorCompletion);

export default router;