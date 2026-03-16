# Análisis de Decisiones: Frontend - FavUPB

Este documento explica el proceso de análisis y la elección de la tecnología que se utilizará para desarrollar la interfaz de usuario de FavUPB, una plataforma de servicios tipo “Rappi de favores” pensada para la comunidad universitaria.

El frontend será la parte de la aplicación con la que los usuarios interactúan directamente. Aquí los estudiantes podrán ver los favores disponibles, publicar solicitudes, revisar perfiles de usuarios y seguir el estado de los pedidos dentro de la plataforma.


## Opciones Consideradas

Se analizaron tres tecnologías muy utilizadas actualmente para el desarrollo de interfaces web modernas:

- **React.js:** 
Es una biblioteca de JavaScript creada por Meta que permite construir interfaces usando componentes reutilizables. Es muy utilizada en aplicaciones web modernas por su buen rendimiento y flexibilidad.

- **Angular:** 
Es un framework desarrollado por Google que incluye muchas herramientas listas para usar. Está pensado principalmente para aplicaciones grandes que requieren una estructura muy organizada.

- **Vue.js:** 
Es un framework progresivo que se caracteriza por ser fácil de aprender. Permite crear interfaces de forma sencilla combinando HTML, JavaScript y un sistema reactivo para actualizar la información en pantalla.

## Análisis de Ventajas y Desventajas (Pros / Contras)
### React.js

#### Ventajas

- **Gran Comunidad:** Es una de las tecnologías más usadas actualmente, por lo que es fácil encontrar tutoriales, documentación y soluciones a problemas.

- **Componentes reutilizables:** Permite crear elementos de la interfaz que se pueden reutilizar en diferentes partes de la aplicación.

- **Buen rendimiento:** Maneja bien las actualizaciones de la interfaz, lo que hace que la aplicación funcione de forma rápida y fluida, especialmente en dispositivos móviles.

#### Desventajas

- **No es un framework completo:** Algunas funcionalidades deben agregarse usando otras herramientas externas.

- **Curva de aprendizaje inicial:** Puede tomar un poco de tiempo acostumbrarse a su forma de trabajar con componentes.

### Angular

#### Ventajas

- **Framework muy completo:** Incluye muchas herramientas listas para usar desde el inicio.

- **Estructura clara:** Obliga a seguir una arquitectura bien definida, lo que ayuda a mantener el orden en proyectos grandes.


#### Desventajas

- **Mayor complejidad:** Es más difícil de aprender que otras opciones.

- **Más pesado:** Puede ser demasiado complejo para proyectos académicos o aplicaciones pequeñas.


### Vue.js

#### Ventajas

- **Fácil de aprender:** Su sintaxis es clara y sencilla, especialmente para principiantes.

- **Ligero y rápido:** Las aplicaciones creadas con Vue suelen ser pequeñas y cargan rápidamente.


#### Desventajas

- **Ecosistema más pequeño:** Tiene menos librerías y herramientas disponibles comparado con React.

- **Menos recursos de aprendizaje:** Existen menos tutoriales y documentación en español.


## 3. Decisión Final: React.js

Después de analizar las diferentes opciones y considerando las necesidades del proyecto FavUPB, se decidió desarrollar el frontend utilizando React.js.

### Justificación de la decisión

**Consistencia del Stack (Full-JavaScript):**
El backend del proyecto será desarrollado con Node.js, que utiliza JavaScript. Usar React en el frontend permite trabajar con el mismo lenguaje en todo el proyecto, lo que facilita la comunicación entre los integrantes del equipo y el desarrollo general.

**Componentes reutilizables para la interfaz:**
La aplicación tendrá muchos elementos repetidos como tarjetas de favores, perfiles de usuarios, listas de pedidos y barras de navegación. React facilita crear componentes que se pueden reutilizar en distintas partes de la aplicación.

**Experiencia optimizada para dispositivos móviles:**
La aplicación será utilizada principalmente por estudiantes dentro del campus, muchas veces desde el celular. React permite crear interfaces rápidas y fluidas que funcionan bien en dispositivos móviles.

**Despliegue y mantenimiento sencillo:**
React se integra fácilmente con plataformas modernas de despliegue como Render, lo que permite publicar y actualizar la aplicación de forma sencilla mediante integración con GitHub.

## Documentación de Herramientas de Apoyo
Para complementar el desarrollo con React se utilizarán las siguientes herramientas:

**Tailwind CSS:**
Se utilizará para diseñar la apariencia de la aplicación de forma rápida y lograr una interfaz moderna y adaptable a diferentes tamaños de pantalla.

**Vite:**
Será la herramienta utilizada para ejecutar y construir el proyecto durante el desarrollo. Permite que la aplicación se cargue rápidamente y mejora la experiencia de desarrollo.gi