# Requisitos funcionales - FavUPB

## RF-001 Registro de usuarios
**Prioridad:** P0

**Característica:** Registro de usuario

**Descripcion:** El sistema deberá permitir a un usuario registrarse mediante un número de teléfono y una contraseña para crear una cuenta dentro de la plataforma.

**Escenario:** Registro exitoso
- **Dado** un usuario sin cuenta en la plataforma
- **Cuando** ingresa un numero de teléfono válido y una contraseña válida
- **Entonces** el sistema crea la cuenta
- **Y** muestra confirmación de registro

**Escenario:** Número ya existente
- **Dado** un usuario registrado con un número de teléfono existente
- **Cuando** intenta registrarse nuevamente con el mismo número
- **Entonces** el sistema rechaza el registro
- **Y** muestra un mensaje de error

---

## RF-002 Inicio y cierre de sesión
**Prioridad:** P0

**Característica:** Autenticación

**Descripcion:** El sistema deberá permitir a los usuarios iniciar sesión con sus credenciales y cerrar sesión cuando lo deseen.

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

**Descripcion:** El sistema deberá permitir al usuario editar su información básica como nombre, foto de perfil y datos de contacto.

**Escenario:** Actualizar información
- **Dado** un usuario autenticado
- **Cuando** modifica su nombre, foto o contacto
- **Entonces** el sistema guarda los cambios

---

## RF-004 Visualización de perfil público
**Prioridad:** P3

**Característica:** Ver perfil público

**Descripcion:** El sistema deberá permitir visualizar el perfil público de otros usuarios registrados en la plataforma.

**Escenario:** Consultar perfil de otro usuario
- **Dado** un usuario autenticado
- **Cuando** abre el perfil de otro usuario
- **Entonces** visualiza solo la información pública

---

## RF-005 Crear solicitud de favor
**Prioridad:** P0

**Característica:** Crear favor

**Descripcion:** El sistema deberá permitir al usuario crear una solicitud de favor ingresando una descripción, una ubicación aproximada y la recompensa económica ofrecida.

**Escenario:** Publicación de favor
- **Dado** un usuario autenticado
- **Cuando** ingresa descripción, ubicación y recompensa válida
- **Entonces** el sistema publica el favor
- **Y** queda visible para otros usuarios

---

## RF-006 Adjuntar imágenes
**Prioridad:** P1

**Característica:** Adjuntar imágenes

**Descripcion:** El sistema deberá permitir al usuario adjuntar una o más imágenes a la solicitud de favor para complementar la descripción.

**Escenario:** Subir imagen válida
- **Dado** una solicitud en creación
- **Cuando** el usuario adjunta una imagen
- **Entonces** la imagen queda asociada al favor

---

## RF-007 Tiempo límite
**Prioridad:** P1

**Característica:** Definir límite de tiempo

**Descripcion:** El sistema deberá permitir al usuario establecer un tiempo límite para la realización del favor solicitado.

**Escenario:** Definir fecha válida
- **Dado** un favor en creación
- **Cuando** el usuario establece una fecha futura
- **Entonces** el sistema guarda el tiempo límite

---

## RF-008 Cancelar solicitud
**Prioridad:** P0

**Característica:** Cancelar favor

**Descripcion:** El sistema deberá permitir al solicitante cancelar una solicitud de favor siempre que esta no haya sido aceptada por otro usuario.

**Escenario:** Cancelar favor disponible
- **Dado** un favor sin aceptar
- **Cuando** el solicitante cancela la solicitud
- **Entonces** el favor desaparece del listado

---

## RF-009 Ver favores disponibles
**Prioridad:** P0

**Característica:** Favores disponibles

**Descripcion:** El sistema deberá mostrar un listado de favores disponibles que puedan ser realizados por el usuario ejecutor.

**Escenario:** Mostrar favores disponibles
- **Dado** el usuario abre la aplicación
- **Cuando** abre la pantalla de exploración
- **Entonces** el sistema muestra favores disponibles

---

## RF-010 Filtrar solicitudes
**Prioridad:** P2

**Característica:** Filtros

**Descripcion:** El sistema deberá permitir al usuario segmentar la búsqueda de favores aplicando filtros específicos por tipo de favor o por el tipo de recompensa ofrecida.

**Escenario:** Filtrar por categoría
- **Dado** el listado de favores
- **Cuando** aplica un filtro
- **Entonces** el listado se actualiza según el filtro

---

## RF-011 Aceptar favor
**Prioridad:** P0

**Característica:** Aceptar favor

**Descripcion:** Un usuario autenticado deberá tener la capacidad de seleccionar y aceptar una solicitud de favor que se encuentre en estado disponible.

**Escenario:** Aceptación exitosa
- **Dado** un favor disponible
- **Cuando** un usuario lo acepta
- **Entonces** el sistema lo asigna al usuario

---

## RF-012 Actualizar disponibilidad
**Prioridad:** P0

**Característica:** Exclusividad del favor

**Descripcion:** Una vez que una solicitud ha sido aceptada por un usuario, el sistema deberá ocultarla automáticamente del listado de disponibles para el resto de los usuarios.

**Escenario:** Evitar doble aceptación
- **Dado** un favor ya aceptado
- **Cuando** otro usuario intenta aceptarlo
- **Entonces** el sistema lo impide

---

## RF-013 Comunicación
**Prioridad:** P1

**Característica:** Mensajería

**Descripcion:** Cuando el favor sea aceptado por alguien, el sistema deberá permitir que los involucrados puedan ver su información de contacto (número de teléfono).

**Escenario:** Comunicación entre usuarios
- **Dado** un favor aceptado
- **Cuando** un usuario guarda y llama al celular
- **Entonces** el otro usuario puede responder

---

## RF-014 Marcar como completado
**Prioridad:** P0

**Característica:** Completar favor

**Descripcion:** El sistema deberá permitir que el usuario ejecutor marque un favor como completado una vez haya finalizado la tarea acordada.

**Escenario:** Ejecutor finaliza favor
- **Dado** un favor en progreso
- **Cuando** el ejecutor lo marca como completado
- **Entonces** el solicitante recibe notificación

---

## RF-015 Confirmar finalización
**Prioridad:** P0

**Característica:** Confirmación

**Descripcion:** El sistema deberá permitir que el solicitante confirme la correcta finalización del favor una vez el ejecutor lo marque como completado.

**Escenario:** Confirmación del solicitante
- **Dado** un favor marcado como completado
- **Cuando** el solicitante confirma
- **Entonces** el estado cambia a finalizado 

---

## RF-016 Historial
**Prioridad:** P3

**Característica:** Historial de favores

**Descripcion:** El sistema deberá registrar y permitir la consulta del historial de favores realizados y solicitados por cada usuario dentro de su perfil.

**Escenario:** Consultar historial
- **Dado** un usuario autenticado
- **Cuando** accede a su perfil
- **Entonces** visualiza sus favores realizados y solicitados

---

## RF-017 Registro de recompensa
**Prioridad:** P0

**Característica:** Registro de pago

**Descripcion:** El sistema debe registrar el valor de la recompensa acordada en el perfil del ejecutor una vez que el favor se marque como finalizado.

**Escenario:** Registrar recompensa
- **Dado** un favor finalizado
- **Cuando** se confirma la entrega
- **Entonces** el sistema registra la transacción

---

## RF-018 Calificar ejecutor
**Prioridad:** P2

**Característica:** Calificación del ejecutor

**Descripcion:** La plataforma permitirá al solicitante evaluar el servicio del ejecutor mediante una escala numérica y comentarios tras recibir el favor.

**Escenario:** Calificar servicio
- **Dado** un favor finalizado
- **Cuando** el solicitante califica
- **Entonces** la calificación queda registrada

---

## RF-019 Calificar solicitante
**Prioridad:** P2

**Característica:** Calificación del solicitante

**Descripcion:** La aplicación debe habilitar una opción para que el ejecutor califique al solicitante, promoviendo el respeto y la confianza en la comunidad.

**Escenario:** Evaluar solicitante
- **Dado** un favor finalizado
- **Cuando** el ejecutor califica
- **Entonces** la puntuación se guarda

---

## RF-020 Mostrar reputación
**Prioridad:** P3

**Característica:** Reputación

**Descripcion:** El sistema calculará y mostrará automáticamente el promedio de calificaciones en el perfil público de cada usuario.

**Escenario:** Mostrar promedio
- **Dado** un usuario con calificaciones
- **Cuando** otro usuario ve su perfil
- **Entonces** el sistema muestra el promedio de reputación