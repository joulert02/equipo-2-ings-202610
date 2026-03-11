# Análisis de Decisiones: Backend - FavUPB

Este documento detalla la evaluación técnica y la selección del framework backend para el desarrollo del servidor de FavUPB, una plataforma de servicios tipo “Rappi de favores” para la comunidad universitaria. El backend será responsable de manejar la lógica de negocio, autenticación de usuarios, almacenamiento de datos y comunicación en tiempo real entre los usuarios de la plataforma.

## Opciones Consideradas

Se analizaron tres tecnologías ampliamente utilizadas para el desarrollo de APIs y servicios backend modernos:

- **Node.js + Express:** 
Express es un framework minimalista para Node.js orientado al desarrollo de APIs REST. Permite construir servicios backend de forma rápida y flexible utilizando JavaScript o TypeScript.

- **Spring Boot:** 
Framework backend del ecosistema Java que permite construir aplicaciones empresariales robustas. Es ampliamente utilizado en sistemas corporativos de gran escala.

- **Django:** 
Framework backend basado en Python que sigue el patrón MVC (MTV en Django). Incluye muchas funcionalidades integradas para desarrollo rápido de aplicaciones web.

## Análisis de Ventajas y Desventajas (Pros / Contras)
### Node.js + Express

#### Ventajas

- **Stack unificado (JavaScript):** Permite utilizar el mismo lenguaje tanto en frontend como en backend.

- **Ligero y flexible:** Express es minimalista y permite estructurar la aplicación según las necesidades del proyecto.

- **Gran ecosistema:** Existe una gran cantidad de librerías para autenticación, validación, tiempo real y bases de datos.

- **Soporte para tiempo real:** Integración sencilla con tecnologías como Socket.io para funcionalidades de chat o actualizaciones en vivo.

#### Desventajas

- **Menos estructura por defecto:** A diferencia de frameworks más grandes, requiere definir manualmente la arquitectura del proyecto.

- **Gestión de dependencias externas:** Muchas funcionalidades deben agregarse mediante librerías externas.

### Spring Boot

#### Ventajas

- **Alta robustez:** Diseñado para sistemas empresariales complejos y de gran escala.

- **Ecosistema muy maduro:** Excelente soporte para seguridad, persistencia de datos y microservicios.

- **Arquitectura altamente estructurada:** Facilita el mantenimiento en equipos grandes.

#### Desventajas

- **Complejidad elevada:** Requiere mayor configuración y conocimiento del ecosistema Java.

- **Mayor consumo de recursos:** Generalmente más pesado que otras soluciones para proyectos pequeños.

- **Excesivo para un MVP académico:** Muchas de sus capacidades no serían necesarias para el alcance del proyecto.

### Django

#### Ventajas

- **Desarrollo rápido:** Incluye muchas herramientas integradas listas para usar (ORM, autenticación, panel de administración).

- **Seguridad integrada:** Buen manejo de autenticación, sesiones y protección contra vulnerabilidades comunes.

- **Comunidad sólida:** Amplia documentación y recursos disponibles.

#### Desventajas

- **Menor compatibilidad con el stack frontend:** Utiliza Python, lo que rompe la consistencia de lenguaje con el frontend.

- **Arquitectura más rígida:** Menos flexible cuando se desea una API muy personalizada.

- **Integración con tiempo real más compleja** comparada con soluciones basadas en Node.js.

## 3. Decisión Final: Node.js + Express

Basándonos en los requerimientos técnicos de FavUPB y el stack tecnológico general del proyecto, la decisión final es construir el backend utilizando Node.js con Express.

### Justificación de la decisión

**Consistencia del Stack (Full-JavaScript):**
Al utilizar React en el frontend, mantener JavaScript también en el backend permite un stack homogéneo que facilita el desarrollo, la comunicación entre miembros del equipo y la reutilización de modelos de datos.

**Desarrollo ágil para un MVP:**
Express permite desarrollar APIs REST de forma rápida sin la complejidad de frameworks empresariales más pesados. Esto es ideal para un proyecto universitario orientado a construir un MVP funcional.

**Integración con tecnologías del proyecto:**
El stack backend se integrará fácilmente con las siguientes herramientas:

- **PostgreSQL** como base de datos relacional para almacenar usuarios, favores y transacciones.

- **JWT + bcrypt** para autenticación segura y manejo de contraseñas.

- **Socket.io** para funcionalidades en tiempo real como chat o actualizaciones de estado de favores.

- **Cloudinary** para el almacenamiento y gestión de imágenes de perfil o imágenes asociadas a los favores.

**Escalabilidad y despliegue sencillo:**
Node.js funciona muy bien en entornos de despliegue modernos como Render, lo que permite integrar pipelines de CI/CD con GitHub y facilitar la entrega continua del proyecto.