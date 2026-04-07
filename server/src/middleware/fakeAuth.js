/**
 * Middleware temporal que simula un usuario autenticado.
 * Reemplazar por verificación de JWT cuando RF-001/RF-002 estén listos.
 */
export function fakeAuth(req, _res, next) {
  req.user = { id: 1, name: "Usuario Test" };
  next();
}