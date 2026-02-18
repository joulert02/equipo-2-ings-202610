# Requisitos funcionales - FavUPB

## Gestión de usuario

---

## RF-001

**Título:**Registro de usuarios

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

**Título:**Inicio y cierre de sesión

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