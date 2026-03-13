# Requisitos No Funcionales

---

## RNF-001

**Título:** Protección de credenciales de usuario  

**Descripción:**  
El sistema deberá garantizar que las credenciales de los usuarios no se almacenen en texto plano y que estén protegidas mediante mecanismos seguros.

**Prioridad:** P0  

**Criterios de aceptación:**
- Las contraseñas se almacenan utilizando algoritmo de hash.
- No existen contraseñas visibles en la base de datos.
- El inicio de sesión funciona correctamente con verificación segura.

---

## RNF-002

**Título:** Comunicación segura entre cliente y servidor  

**Descripción:**  
La aplicación deberá garantizar que toda la comunicación entre el dispositivo móvil y el servidor se realice mediante protocolos seguros.

**Prioridad:** P0  

**Criterios de aceptación:**
- Todas las solicitudes a la API utilizan HTTPS.
- No se permiten conexiones inseguras (HTTP).
- Las credenciales no viajan en texto plano.

---

## RNF-003

**Título:** Tiempo de respuesta del sistema  

**Descripción:**  
La aplicación deberá responder a las acciones principales del usuario dentro de un tiempo aceptable bajo condiciones normales de uso.

**Prioridad:** P0  

**Criterios de aceptación:**
- El tiempo de carga de pantallas principales es menor o igual a 3 segundos.
- La creación y aceptación de favores no presenta bloqueos perceptibles.

---

## RNF-004

**Título:** Manejo de fallos del sistema  

**Descripción:**  
El sistema deberá gestionar adecuadamente errores comunes sin provocar cierres inesperados.

**Prioridad:** P0  

**Criterios de aceptación:**
- Si se pierde la conexión, se muestra un mensaje claro.
- La aplicación no se cierra ante un error del servidor.
- Los errores se registran para revisión técnica.

---

## RNF-005

**Título:** Disponibilidad del sistema  

**Descripción:**  
El sistema deberá estar disponible durante los periodos académicos, permitiendo mantenimientos programados.

**Prioridad:** P1  

**Criterios de aceptación:**
- La aplicación puede accederse normalmente durante horario académico.
- Los mantenimientos se notifican previamente si es posible.

---

## RNF-006

**Título:** Usabilidad de la interfaz  

**Descripción:**  
La aplicación deberá ofrecer una interfaz clara e intuitiva que facilite el uso sin necesidad de capacitación previa.

**Prioridad:** P1  

**Criterios de aceptación:**
- Un usuario nuevo puede publicar o aceptar un favor en menos de 5 minutos.
- La navegación entre pantallas es consistente.
- Los botones y acciones son claramente identificables.

---

## RNF-007

**Título:** Accesibilidad básica (A11Y)

**Descripción:**  
La aplicación deberá cumplir buenas prácticas básicas de accesibilidad móvil.

**Prioridad:** P1  

**Criterios de aceptación:**
- El texto mantiene contraste adecuado.
- Los tamaños de fuente son legibles.
- La aplicación es compatible con lectores de pantalla.

---

## RNF-008

**Título:** Escalabilidad de la arquitectura  

**Descripción:**  
El sistema deberá permitir la incorporación de nuevas funcionalidades sin requerir una reestructuración completa.

**Prioridad:** P2  

**Criterios de aceptación:**
- Las funcionalidades están organizadas por módulos.
- La lógica de negocio se encuentra separada de la interfaz.
- Es posible agregar nuevos servicios sin modificar el núcleo del sistema.

---

## RNF-009

**Título:** Mantenibilidad del código  

**Descripción:**  
El proyecto deberá mantener una estructura clara que facilite su comprensión y mantenimiento futuro.

**Prioridad:** P2  

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
