# Requisitos funcionales - FavUPB



## RF-001

**Título**: Registro de usuarios

**Descripción:**
El sistema deberá permitir a un usuario registrarse mediante un correo electrónico y una contraseña para crear una cuenta dentro de la plataforma.

**Prioridad:** P0

**Criterios de aceptación:**

- El usuario puede ingresar correo electrónico y contraseña en el formulario de registro.
- El sistema valida que el correo tenga un formato correcto.
- El sistema impide el registro de correos ya existentes.
- La contraseña debe cumplir con una longitud mínima definida.
- El sistema confirma el registro exitoso del usuario.

---

## RF-002

**Título**: Inicio y cierre de sesión

**Descripción:**
El sistema deberá permitir a los usuarios iniciar sesión con sus credenciales y cerrar sesión cuando lo deseen.

**Prioridad:** P0

**Criterios de aceptación:**

- El usuario puede iniciar sesión ingresando correo y contraseña válidos.
- El sistema muestra un mensaje de error si los datos son incorrectos.
- El sistema permite cerrar sesión de manera segura.
- Al cerrar sesión, se finaliza la sesión activa del usuario.

---

## RF-003

**Título:** Edición de información básica

**Descripción:**
El sistema deberá permitir al usuario editar su información básica como nombre, foto de perfil y datos de contacto.

**Prioridad:** P1

**Criterios de aceptación:**

- El usuario puede acceder a la opción de editar perfil.
- El sistema permite modificar el nombre del usuario.
- El sistema permite cambiar la foto de perfil.
- El sistema permite actualizar los datos de contacto.
- Los cambios se guardan correctamente.

---

## RF-004

**Título:** Visualización de perfil público

**Descripción:**
El sistema deberá permitir visualizar el perfil público de otros usuarios registrados en la plataforma.

**Prioridad:** P3

**Criterios de aceptación:**

- El usuario puede seleccionar otro usuario para ver su perfil.
- El sistema muestra únicamente la información pública del perfil.
- El sistema no permite modificar información de otros usuarios.
- La información se presenta de forma clara y ordenada.

---

## RF-005

**Título:** Creación de solicitud de favor

**Descripción:**
El sistema deberá permitir al usuario crear una solicitud de favor ingresando una descripción, una ubicación aproximada y la recompensa económica ofrecida.

**Prioridad:** P0

**Criterios de aceptación:**

- El usuario puede ingresar una descripción obligatoria del favor.
- El usuario puede especificar una ubicación aproximada.
- El usuario debe ingresar un valor de recompensa económica válido.
- La solicitud queda visible para otros usuarios después de ser publicada.

---

## RF-006

**Título:** Adjuntar imágenes a la solicitud

**Descripción:**
El sistema deberá permitir al usuario adjuntar una o más imágenes a la solicitud de favor para complementar la descripción.

**Prioridad:** P1

**Criterios de aceptación:**

- El usuario puede seleccionar imágenes desde el dispositivo móvil.
- Las imágenes se cargan correctamente junto con la solicitud.
- Otros usuarios pueden visualizar las imágenes asociadas al favor.
- El sistema rechaza archivos que no sean imágenes.

---

## RF-007

**Título:** Definición de tiempo límite del favor

**Descripción:**
El sistema deberá permitir al usuario establecer un tiempo límite para la realización del favor solicitado.

**Prioridad:** P1

**Criterios de aceptación:**

- El usuario puede seleccionar fecha y hora límite.
- El tiempo límite debe ser posterior al momento de creación.
- El tiempo límite se muestra a los usuarios que visualizan la solicitud.
- Una solicitud expirada no puede ser aceptada.

---

## RF-008

**Título:** Cancelación de solicitud de favor

**Descripción:**
El sistema deberá permitir al solicitante cancelar una solicitud de favor siempre que esta no haya sido aceptada por otro usuario.

**Prioridad:** P0

**Criterios de aceptación:**

- El solicitante puede cancelar la solicitud desde la aplicación.
- La solicitud deja de aparecer en la lista de favores disponibles.

---

## RF-009
**Título:** Visualización de favores cercanos

**Descripción:** El sistema deberá mostrar un listado de favores disponibles que se encuentren en una ubicación cercana a la posición actual del usuario.

**Prioridad:** P2

**Criterios de aceptación:**

- El sistema accede a la ubicación del usuario (con permiso).

- Se despliega una lista o mapa con las solicitudes activas.

- Solo se muestran favores que no han sido aceptados aún.

---

## RF-010
**Título:** Filtrado de solicitudes

**Descripción:** El sistema deberá permitir al usuario segmentar la búsqueda de favores aplicando filtros específicos por tipo de favor o por el tipo de recompensa ofrecida.

**Prioridad:** P2

**Criterios de aceptación:**

- Existe un menú o botón de filtros visible en la pantalla de exploración.

- El usuario puede seleccionar una categoría (ej. transporte, entrega, académico).

- El listado se actualiza instantáneamente al aplicar los filtros.

---

## RF-011
**Título:** Aceptación de solicitudes

**Descripción:** Un usuario autenticado deberá tener la capacidad de seleccionar y aceptar una solicitud de favor que se encuentre en estado disponible.

**Prioridad:** P0

**Criterios de aceptación:**

- El usuario puede ver el detalle del favor antes de aceptar.

- Existe un botón claro de "Aceptar Favor".

- El sistema confirma al usuario que la acción se realizó con éxito.
---

## RF-012
**Título:** Actualización de disponibilidad de favores

**Descripción:** Una vez que una solicitud ha sido aceptada por un usuario, el sistema deberá ocultarla automáticamente del listado de disponibles para el resto de los usuarios.

**Prioridad:** P0

**Criterios de aceptación:**

- El favor cambia su estado a "En progreso" o "Aceptado" en la base de datos.

- La solicitud deja de ser visible en el feed global de otros usuarios.

- Se evita que dos usuarios puedan aceptar el mismo favor simultáneamente (control de concurrrencia).