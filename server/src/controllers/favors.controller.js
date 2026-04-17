import prisma from "../lib/prisma.js";

/**
 * Obtiene todos los favores disponibles para mostrar en el feed.
 * - Filtra únicamente los que están en estado "AVAILABLE"
 * - Los ordena desde el más reciente al más antiguo
 * - Incluye información básica del usuario que creó el favor
 */
export async function getFavors(_req, res) {
  try {
    const favors = await prisma.favor.findMany({
      where: { status: "AVAILABLE" },
      orderBy: { createdAt: "desc" },
      include: {
        requester: { select: { id: true, name: true } },
      },
    });

    res.json(favors);
  } catch (error) {
    console.error("getFavors:", error);
    res.status(500).json({ message: "Error al obtener favores" });
  }
}

/**
 * Crea un nuevo favor en el sistema.
 * - Valida que los campos obligatorios estén presentes
 * - Verifica que la recompensa sea mayor a 0
 * - Valida que la fecha límite sea futura (si se proporciona)
 * - Asocia el favor al usuario autenticado
 */
export async function createFavor(req, res) {
  const { title, description, location, reward, deadline } = req.body;

  if (!title || !description || !location || reward === undefined) {
    return res.status(400).json({
      message: "title, description, location y reward son obligatorios",
    });
  }

  if (reward <= 0) {
    return res.status(400).json({
      message: "La recompensa debe ser mayor a 0",
    });
  }

  if (deadline && new Date(deadline) <= new Date()) {
    return res.status(400).json({
      message: "La fecha límite debe ser futura",
    });
  }

  try {
    const favor = await prisma.favor.create({
      data: {
        title,
        description,
        location,
        reward: parseFloat(reward),
        deadline: deadline ? new Date(deadline) : null,
        requesterId: req.user.id,
      },
      include: {
        requester: { select: { id: true, name: true } },
      },
    });

    res.status(201).json(favor);
  } catch (error) {
    console.error("createFavor:", error);
    res.status(500).json({ message: "Error al crear el favor" });
  }
}

/**
 * Cancela un favor existente.
 * - Verifica que el favor exista
 * - Valida que el usuario autenticado sea el creador del favor
 * - Solo permite cancelar si el favor sigue disponible
 * - Cambia el estado a "CANCELLED"
 */
export async function cancelFavor(req, res) {
  const favorId = parseInt(req.params.id);

  try {
    const favor = await prisma.favor.findUnique({ where: { id: favorId } });

    if (!favor) {
      return res.status(404).json({ message: "Favor no encontrado" });
    }

    if (favor.requesterId !== req.user.id) {
      return res.status(403).json({
        message: "Solo el solicitante puede cancelar este favor",
      });
    }

    if (favor.status !== "AVAILABLE") {
      return res.status(409).json({
        message: "Solo se puede cancelar un favor que aún no ha sido aceptado",
      });
    }

    const updated = await prisma.favor.update({
      where: { id: favorId },
      data: { status: "CANCELLED" },
    });

    res.json(updated);
  } catch (error) {
    console.error("cancelFavor:", error);
    res.status(500).json({ message: "Error al cancelar el favor" });
  }
}

/**
 * Marca un favor como completado.
 * - Verifica que el favor exista
 * - Solo el usuario asignado como ejecutor puede completarlo
 * - El favor debe estar en estado "ACCEPTED"
 * - Actualiza el estado a "COMPLETED"
 */
export async function markFavorAsCompleted(req, res) {
  const favorId = parseInt(req.params.id);

  try {
    const favor = await prisma.favor.findUnique({ where: { id: favorId } });

    if (!favor) {
      return res.status(404).json({ message: "Favor no encontrado" });
    }

    if (favor.executorId !== req.user.id) {
      return res.status(403).json({
        message: "Solo el ejecutor asignado puede completar este favor",
      });
    }

     if (favor.status !== "ACCEPTED") {
      return res.status(409).json({
        message: "Solo se puede completar un favor que haya sido aceptado",
      });
    }

    const updated = await prisma.favor.update({
      where: { id: favorId },
      data: { status: "COMPLETED" },
    });

    res.json(updated);
  } catch (error) {
    console.error("markFavorAsCompleted:", error);
    res.status(500).json({ message: "Error al completar el favor" });
  }
 }