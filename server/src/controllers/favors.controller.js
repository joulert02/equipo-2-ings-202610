import prisma from "../lib/prisma.js";

/**
 * RF-009 — Ver favores disponibles
 * GET /api/favors
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
 * RF-005 — Crear solicitud de favor
 * POST /api/favors
 */
export async function createFavor(req, res) {
  const { title, description, location, reward, deadline } = req.body;

  if (!title || !description || !location || reward === undefined) {
    return res.status(400).json({ message: "title, description, location y reward son obligatorios" });
  }

  if (reward <= 0) {
    return res.status(400).json({ message: "La recompensa debe ser mayor a 0" });
  }

  if (deadline && new Date(deadline) <= new Date()) {
    return res.status(400).json({ message: "La fecha límite debe ser futura" });
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
 * RF-008 — Cancelar solicitud
 * PATCH /api/favors/:id/cancel
 */
export async function cancelFavor(req, res) {
  const favorId = parseInt(req.params.id);

  try {
    const favor = await prisma.favor.findUnique({ where: { id: favorId } });

    if (!favor) {
      return res.status(404).json({ message: "Favor no encontrado" });
    }

    if (favor.requesterId !== req.user.id) {
      return res.status(403).json({ message: "Solo el solicitante puede cancelar este favor" });
    }

    if (favor.status !== "AVAILABLE") {
      return res.status(409).json({ message: "Solo se puede cancelar un favor que aún no ha sido aceptado" });
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