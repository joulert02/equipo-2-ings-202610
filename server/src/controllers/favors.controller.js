import prisma from "../lib/prisma.js";

/**
 * Obtiene todos los favores disponibles para mostrar en el feed.
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
 */
export async function createFavor(req, res) {
  const { title, description, location, reward, deadline } = req.body;
  if (!title || !description || !location || reward === undefined) {
    return res.status(400).json({ message: "Campos obligatorios faltantes" });
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
 */
export async function cancelFavor(req, res) {
  const favorId = parseInt(req.params.id);
  try {
    const favor = await prisma.favor.findUnique({ where: { id: favorId } });
    if (!favor) return res.status(404).json({ message: "Favor no encontrado" });
    if (favor.requesterId !== req.user.id) {
      return res.status(403).json({ message: "No autorizado" });
    }
    const updated = await prisma.favor.update({
      where: { id: favorId },
      data: { status: "CANCELLED" },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar" });
  }
}

/**
 * ACEPTAR FAVOR 
 */
export async function acceptFavor(req, res) {
  const favorId = parseInt(req.params.id);
  try {
    const favor = await prisma.favor.findUnique({ where: { id: favorId } });
    if (!favor) return res.status(404).json({ message: "Favor no encontrado" });
    if (favor.requesterId === req.user.id) {
      return res.status(403).json({ message: "No puedes aceptar tu propio favor" });
    }
    if (favor.status !== "AVAILABLE") {
      return res.status(409).json({ message: "Este favor ya no está disponible" });
    }
    const updated = await prisma.favor.update({
      where: { id: favorId },
      data: { status: "ACCEPTED", executorId: req.user.id },
      include: {
        requester: { select: { id: true, name: true, phone: true } },
        executor: { select: { id: true, name: true } },
      },
    });
    res.json(updated);
  } catch (error) {
    console.error("acceptFavor:", error);
    res.status(500).json({ message: "Error al aceptar el favor" });
  }
}

/**
 * MARCAR COMO COMPLETADO 
 */
export async function markFavorAsCompleted(req, res) {
  const favorId = parseInt(req.params.id);
  try {
    const favor = await prisma.favor.findUnique({ where: { id: favorId } });
    if (!favor) return res.status(404).json({ message: "Favor no encontrado" });
    if (favor.executorId !== req.user.id) {
      return res.status(403).json({ message: "Solo el ejecutor puede completar este favor" });
    }
    if (favor.status !== "ACCEPTED") {
      return res.status(409).json({ message: "Solo se puede completar un favor aceptado" });
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

/**
 * OBTENER MIS FAVORES ACEPTADOS 
 */
export async function getMyAcceptedFavors(req, res) {
  try {
    const favors = await prisma.favor.findMany({
      where: { executorId: req.user.id, status: "ACCEPTED" },
      orderBy: { createdAt: "desc" },
      include: {
        requester: { select: { id: true, name: true, phone: true } },
      },
    });
    res.json(favors);
  } catch (error) {
    console.error("getMyAcceptedFavors:", error);
    res.status(500).json({ message: "Error al obtener favores aceptados" });
  }
}