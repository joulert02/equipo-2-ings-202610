// Middleware temporal que simula autenticación inyectando un usuario de prueba.
// Será reemplazado por verificación de JWT cuando se implementen los requisitos de autenticación.
export function fakeAuth(req, _res, next) {
  req.user = { id: 1, name: "Usuario Test" };
  next();
}