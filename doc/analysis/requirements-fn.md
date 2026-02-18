# Requisitos funcionales - FavUPB

## RF-001 Registro de usuarios
**Prioridad:** P0
**Característica:** Registro de usuario

**Escenario:** Registro exitoso
- **Dado** un usuario sin cuenta en la plataforma
- **Cuando** ingresa un correo válido y una contraseña válida
- **Entonces** el sistema crea la cuenta
- **Y** muestra confirmación de registro

**Escenario:** Correo ya existente
- **Dado** un usuario registrado con un correo existente
- **Cuando** intenta registrarse nuevamente con el mismo correo
- **Entonces** el sistema rechaza el registro
- **Y** muestra un mensaje de error

---

## RF-002 Inicio y cierre de sesión
**Prioridad:** P0
**Característica:** Autenticación

**Escenario:** Inicio de sesión correcto
- **Dado** un usuario registrado
- **Cuando** ingresa credenciales válidas
- **Entonces** el sistema inicia sesión

**Escenario:** Cierre de sesión
- **Dado** un usuario autenticado
- **Cuando** selecciona cerrar sesión
- **Entonces** el sistema finaliza la sesión activa

---

## RF-003 Edición de perfil
**Prioridad:** P1
**Característica:** Edición de perfil

**Escenario:** Actualizar información
- **Dado** un usuario autenticado
- **Cuando** modifica su nombre, foto o contacto
- **Entonces** el sistema guarda los cambios

---

## RF-004 Visualización de perfil público
**Prioridad:** P3
**Característica:** Ver perfil público

**Escenario:** Consultar perfil de otro usuario
- **Dado** un usuario autenticado
- **Cuando** abre el perfil de otro usuario
- **Entonces** visualiza solo la información pública

---

## RF-005 Crear solicitud de favor
**Prioridad:** P0
**Característica:** Crear favor

**Escenario:** Publicación de favor
- **Dado** un usuario autenticado
- **Cuando** ingresa descripción, ubicación y recompensa válida
- **Entonces** el sistema publica el favor
- **Y** queda visible para otros usuarios

---

## RF-006 Adjuntar imágenes
**Prioridad:** P1
**Característica:** Adjuntar imágenes

**Escenario:** Subir imagen válida
- **Dado** una solicitud en creación
- **Cuando** el usuario adjunta una imagen
- **Entonces** la imagen queda asociada al favor

---

## RF-007 Tiempo límite
**Prioridad:** P1
**Característica:** Definir límite de tiempo

**Escenario:** Definir fecha válida
- **Dado** un favor en creación
- **Cuando** el usuario establece una fecha futura
- **Entonces** el sistema guarda el tiempo límite

---

## RF-008 Cancelar solicitud
**Prioridad:** P0
**Característica:** Cancelar favor

**Escenario:** Cancelar favor disponible
- **Dado** un favor sin aceptar
- **Cuando** el solicitante cancela la solicitud
- **Entonces** el favor desaparece del listado

---

## RF-009 Ver favores cercanos
**Prioridad:** P2
**Característica:** Favores cercanos

**Escenario:** Mostrar favores disponibles
- **Dado** el usuario permite acceso a ubicación
- **Cuando** abre la pantalla de exploración
- **Entonces** el sistema muestra favores cercanos disponibles

---

## RF-010 Filtrar solicitudes
**Prioridad:** P2
**Característica:** Filtros

**Escenario:** Filtrar por categoría
- **Dado** el listado de favores
- **Cuando** aplica un filtro
- **Entonces** el listado se actualiza según el filtro

---

## RF-011 Aceptar favor
**Prioridad:** P0
**Característica:** Aceptar favor

**Escenario:** Aceptación exitosa
- **Dado** un favor disponible
- **Cuando** un usuario lo acepta
- **Entonces** el sistema lo asigna al usuario

---

## RF-012 Actualizar disponibilidad
**Prioridad:** P0
**Característica:** Exclusividad del favor

**Escenario:** Evitar doble aceptación
- **Dado** un favor ya aceptado
- **Cuando** otro usuario intenta aceptarlo
- **Entonces** el sistema lo impide

---

## RF-013 Chat del favor
**Prioridad:** P0
**Característica:** Mensajería

**Escenario:** Comunicación entre usuarios
- **Dado** un favor aceptado
- **Cuando** un usuario envía un mensaje
- **Entonces** el otro usuario puede leerlo

---

## RF-014 Marcar como completado
**Prioridad:** P0
**Característica:** Completar favor

**Escenario:** Ejecutor finaliza favor
- **Dado** un favor en progreso
- **Cuando** el ejecutor lo marca como completado
- **Entonces** el solicitante recibe notificación

---

## RF-015 Confirmar finalización
**Prioridad:** P0
**Característica:** Confirmación

**Escenario:** Confirmación del solicitante
- **Dado** un favor marcado como completado
- **Cuando** el solicitante confirma
- **Entonces** el estado cambia a finalizado 

---

## RF-016 Historial
**Prioridad:** P3
**Característica:** Historial de favores

**Escenario:** Consultar historial
- **Dado** un usuario autenticado
- **Cuando** accede a su perfil
- **Entonces** visualiza sus favores realizados y solicitados

---

## RF-017 Registro de recompensa
**Prioridad:** P0
**Característica:** Registro de pago

**Escenario:** Registrar recompensa
- **Dado** un favor finalizado
- **Cuando** se confirma la entrega
- **Entonces** el sistema registra la transacción

---

## RF-018 Calificar ejecutor
**Prioridad:** P2
**Característica:** Calificación del ejecutor

**Escenario:** Calificar servicio
- **Dado** un favor finalizado
- **Cuando** el solicitante califica
- **Entonces** la calificación queda registrada

---

## RF-019 Calificar solicitante
**Prioridad:** P2
**Característica:** Calificación del solicitante

**Escenario:** Evaluar solicitante
- **Dado** un favor finalizado
- **Cuando** el ejecutor califica
- **Entonces** la puntuación se guarda

---

## RF-020 Mostrar reputación
**Prioridad:** P3
**Característica:** Reputación

**Escenario:** Mostrar promedio
- **Dado** un usuario con calificaciones
- **Cuando** otro usuario ve su perfil
- **Entonces** el sistema muestra el promedio de reputación