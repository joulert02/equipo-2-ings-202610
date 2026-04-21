import { Router } from "express";
// Usamos el middleware real de autenticación
import { authenticate } from "../middleware/authenticate.js";
// Importamos todas las funcione
import { 
  getFavors, 
  createFavor, 
  cancelFavor, 
  acceptFavor, 
  markFavorAsCompleted, 
  getMyAcceptedFavors 
} from "../controllers/favors.controller.js";

const router = Router();

// Todas las rutas usan 'authenticate'
router.get("/", authenticate, getFavors);
router.post("/", authenticate, createFavor);
router.get("/accepted", authenticate, getMyAcceptedFavors);
router.patch("/:id/cancel", authenticate, cancelFavor);
router.patch("/:id/accept", authenticate, acceptFavor);

// ruta nueva para completar el favor
router.patch("/:id/complete", authenticate, markFavorAsCompleted);

export default router;