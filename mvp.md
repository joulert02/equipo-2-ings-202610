# Requisitos funcionales - FavUPB

## RF-001 Registro de usuarios -- FbPts: 3
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

## RF-002 Inicio y cierre de sesión -- FbPts: 3
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

## RF-005 Crear solicitud de favor -- FbPts: 5
**Prioridad:** P0

**Característica:** Crear favor

**Descripcion:** El sistema deberá permitir al usuario crear una solicitud de favor ingresando una descripción, una ubicación aproximada y la recompensa económica ofrecida.

**Escenario:** Publicación de favor
- **Dado** un usuario autenticado
- **Cuando** ingresa descripción, ubicación y recompensa válida
- **Entonces** el sistema publica el favor
- **Y** queda visible para otros usuarios

---

## RF-007 Tiempo límite -- FbPts: 5
**Prioridad:** P1

**Característica:** Definir límite de tiempo

**Descripcion:** El sistema deberá permitir al usuario establecer un tiempo límite para la realización del favor solicitado.

**Escenario:** Definir fecha válida
- **Dado** un favor en creación
- **Cuando** el usuario establece una fecha futura
- **Entonces** el sistema guarda el tiempo límite

---

## RF-008 Cancelar solicitud -- FbPts: 3
**Prioridad:** P0

**Característica:** Cancelar favor

**Descripcion:** El sistema deberá permitir al solicitante cancelar una solicitud de favor siempre que esta no haya sido aceptada por otro usuario.

**Escenario:** Cancelar favor disponible
- **Dado** un favor sin aceptar
- **Cuando** el solicitante cancela la solicitud
- **Entonces** el favor desaparece del listado

---

## RF-009 Ver favores disponibles -- FbPts: 5
**Prioridad:** P0

**Característica:** Favores disponibles

**Descripcion:** El sistema deberá mostrar un listado de favores disponibles que puedan ser realizados por el usuario ejecutor.

**Escenario:** Mostrar favores disponibles
- **Dado** el usuario abre la aplicación
- **Cuando** abre la pantalla de exploración
- **Entonces** el sistema muestra favores disponibles

---

## RF-011 Aceptar favor -- FbPts: 5
**Prioridad:** P0

**Característica:** Aceptar favor

**Descripcion:** Un usuario autenticado deberá tener la capacidad de seleccionar y aceptar una solicitud de favor que se encuentre en estado disponible.

**Escenario:** Aceptación exitosa
- **Dado** un favor disponible
- **Cuando** un usuario lo acepta
- **Entonces** el sistema lo asigna al usuario

---

## RF-012 Actualizar disponibilidad -- FbPts: 8
**Prioridad:** P0

**Característica:** Exclusividad del favor

**Descripcion:** Una vez que una solicitud ha sido aceptada por un usuario, el sistema deberá ocultarla automáticamente del listado de disponibles para el resto de los usuarios.

**Escenario:** Evitar doble aceptación
- **Dado** un favor ya aceptado
- **Cuando** otro usuario intenta aceptarlo
- **Entonces** el sistema lo impide

---

## RF-013 Comunicación -- FbPts: 3
**Prioridad:** P1

**Característica:** Comunicación

**Descripcion:** Cuando el favor sea aceptado por alguien, el sistema deberá permitir que los involucrados puedan ver su información de contacto (número de teléfono).

**Escenario:** Comunicación entre usuarios
- **Dado** un favor aceptado
- **Cuando** un usuario guarda y llama al celular
- **Entonces** el otro usuario puede responder

---

## RF-014 Marcar como completado -- FbPts: 3
**Prioridad:** P0

**Característica:** Completar favor

**Descripcion:** El sistema deberá permitir que el usuario ejecutor marque un favor como completado una vez haya finalizado la tarea acordada.

**Escenario:** Ejecutor finaliza favor
- **Dado** un favor en progreso
- **Cuando** el ejecutor lo marca como completado
- **Entonces** el solicitante recibe notificación

---

## RF-015 Confirmar finalización -- FbPts: 3
**Prioridad:** P0

**Característica:** Confirmación

**Descripcion:** El sistema deberá permitir que el solicitante confirme la correcta finalización del favor una vez el ejecutor lo marque como completado.

**Escenario:** Confirmación del solicitante
- **Dado** un favor marcado como completado
- **Cuando** el solicitante confirma
- **Entonces** el estado cambia a finalizado 

---

# Requisitos No Funcionales

## RNF-001 -- FbPts: 3

**Título:** Protección de credenciales de usuario  

**Descripción:**  
El sistema deberá garantizar que las credenciales de los usuarios no se almacenen en texto plano y que estén protegidas mediante mecanismos seguros.

**Prioridad:** P0  

**Criterios de aceptación:**
- Las contraseñas se almacenan utilizando algoritmo de hash.
- No existen contraseñas visibles en la base de datos.
- El inicio de sesión funciona correctamente con verificación segura.

---

## RNF-002 -- FbPts: 3

**Título:** Comunicación segura entre cliente y servidor  

**Descripción:**  
La aplicación deberá garantizar que toda la comunicación entre el dispositivo móvil y el servidor se realice mediante protocolos seguros.

**Prioridad:** P0  

**Criterios de aceptación:**
- Todas las solicitudes a la API utilizan HTTPS.
- No se permiten conexiones inseguras (HTTP).
- Las credenciales no viajan en texto plano.

---

## RNF-004 -- FbPts: 5

**Título:** Manejo de fallos del sistema  

**Descripción:**  
El sistema deberá gestionar adecuadamente errores comunes sin provocar cierres inesperados.

**Prioridad:** P0  

**Criterios de aceptación:**
- Si se pierde la conexión, se muestra un mensaje claro.
- La aplicación no se cierra ante un error del servidor.
- Los errores se registran para revisión técnica.

---

## RNF-008 -- FbPts: 8

**Título:** Escalabilidad de la arquitectura  

**Descripción:**  
El sistema deberá permitir la incorporación de nuevas funcionalidades sin requerir una reestructuración completa.

**Prioridad:** P1  

**Criterios de aceptación:**
- Las funcionalidades están organizadas por módulos.
- La lógica de negocio se encuentra separada de la interfaz.
- Es posible agregar nuevos servicios sin modificar el núcleo del sistema.

---

## RNF-009 -- FbPts: 3

**Título:** Mantenibilidad del código  

**Descripción:**  
El proyecto deberá mantener una estructura clara que facilite su comprensión y mantenimiento futuro.

**Prioridad:** P1  

**Criterios de aceptación:**
- El código está organizado por carpetas funcionales.
- Existe documentación básica del proyecto.
- No existen dependencias innecesarias.

---

## RNF-010 -- FbPts: 5

**Título:** Diseño con enfoque "Mobile First"

**Descripción:**  
La aplicación deberá poder verse bien en cualquier navegador de cualquier dispositivo Android o iOS.

**Prioridad:** P1  

**Criterios de aceptación:**
- La aplicación se ve correctamente en Android.
- La aplicación se ve correctamente en iOS.
- Las funcionalidades principales operan sin errores.
