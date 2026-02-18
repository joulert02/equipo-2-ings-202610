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
---

## RF-013

### Seguimiento del favor

**Descripción:**  
El sistema deberá permitir la comunicación básica entre el solicitante y el ejecutor mediante un módulo de mensajería dentro de la plataforma, asociado a cada favor aceptado.

**Prioridad:** P0  

**Criterios de aceptación:**  
- El chat solo estará disponible cuando el favor haya sido aceptado.  
- Los mensajes deberán estar asociados al favor correspondiente.  
- Ambos usuarios podrán visualizar el historial completo de la conversación.  
- El sistema deberá almacenar los mensajes enviados y recibidos.  

---

## RF-014

### Marcar favor como completado

**Descripción:**  
El sistema deberá permitir que el usuario ejecutor marque un favor como completado una vez haya finalizado la tarea acordada.

**Prioridad:** P0  

**Criterios de aceptación:**  
- Solo el ejecutor asignado podrá cambiar el estado a “Completado”.  
- El cambio de estado deberá quedar registrado en el sistema.  
- El solicitante deberá recibir una notificación del cambio de estado.  

---

## RF-015

### Confirmación del favor

**Descripción:**  
El sistema deberá permitir que el solicitante confirme la correcta finalización del favor una vez el ejecutor lo marque como completado.

**Prioridad:** P0  

**Criterios de aceptación:**  
- El solicitante podrá confirmar o rechazar la finalización.  
- El estado del favor cambiará a “Finalizado” únicamente cuando el solicitante confirme.  
- La confirmación deberá quedar registrada en el historial del favor.  

---

## RF-016

### Historial de favores

**Descripción:**  
El sistema deberá registrar y permitir la consulta del historial de favores realizados y solicitados por cada usuario dentro de su perfil.

**Prioridad:** P3  

**Criterios de aceptación:**  
- El historial mostrará favores solicitados y ejecutados.  
- Cada registro incluirá estado, fecha y usuario relacionado.  
- El usuario solo podrá visualizar su propio historial.  
- La información deberá mantenerse disponible mientras la cuenta esté activa.  

---
## RF-017
**Registro de transacciones**

**Descripción:** 
El sistema debe registrar el valor de la recompensa acordada en el perfil del ejecutor una vez que el favor se marque como finalizado. 

**Prioridad:** P0

**Criterios de Aceptación:**
- El sistema detecta el cambio de estado a "Finalizado". 
- Se suma el monto exacto al balance digital del ejecutor.
- Se genera un comprobante o registro histórico de la transacción.

---
## RF-018

**Calificación del ejecutor**

**Descripción:**
 La plataforma permitirá al solicitante evaluar el servicio del ejecutor mediante una escala numérica y comentarios tras recibir el favor. 

**Prioridad:** P2

**Criterios de Aceptación:**
- Habilitar selección de 1 a 5 estrellas al cerrar el favor.
- Permitir el ingreso de un comentario de texto opcional.
- Validar que solo el solicitante del favor pueda calificar al ejecutor.

---

## RF-019

**Calificación del solicitante**

**Descripción:**
La aplicación debe habilitar una opción para que el ejecutor califique al solicitante, promoviendo el respeto y la confianza en la comunidad. 

**Prioridad:** P2

**Criterios de Aceptación:**
- Habilitar formulario de calificación tras la entrega del favor.
- Almacenar la puntuación en el perfil del solicitante.
- Garantizar que la calificación sea recíproca y justa.

---

## RF-020

**Visualización de reputación** 

**Descripción:** 
El sistema calculará y mostrará automáticamente el promedio de calificaciones en el perfil público de cada usuario. 

**Prioridad:** P3

**Criterios de Aceptación:**
- Cálculo automático del promedio matemático de estrellas.
- Actualización del perfil en tiempo real tras cada nueva reseña.
- Visualización pública de la puntuación en la vista de perfil y solicitudes.

---