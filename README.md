### Frontend – Aplicación Web de Películas y Directores

### Descripción del Proyecto

Este proyecto corresponde al frontend de una aplicación Full-Stack desarrollado con React.
Su objetivo es consumir la API REST creada en el backend con Django y permitir la gestión visual e interactiva de Directores y Películas.

Su responsabilidad principal es consumir los endpoints REST del backend, gestionar la autenticación mediante OAuth 2.0 (uso de token), permitir operaciones CRUD desde una interfaz gráfica y garantizar una experiencia de usuario clara y funcional.

### Objetivos del Proyecto

Implementar una interfaz web moderna utilizando React.
Consumir servicios REST protegidos mediante OAuth 2.0.
Gestionar autenticación basada en tokens.
Implementar operaciones CRUD completas desde el cliente.
Aplicar buenas prácticas de organización de código (separación de responsabilidades).
Integrar el frontend con el backend previamente desarrollado.

### Tecnologías Utilizadas

Node.js.
React.
React Router DOM.
Axios.
Material UI.
JavaScript (ES6+).
Vite (entorno de desarrollo).

### Arquitectura del Proyecto

El proyecto está estructurado bajo el principio de separación de responsabilidades.

### Pages

Contienen las pantallas principales del sistema, como Login, Lista de Directores, Lista de Películas y formularios de creación y edición.

### Services

Contienen la lógica para consumir la API REST mediante Axios.
Se encargan de enviar credenciales al backend, obtener el token de acceso, realizar peticiones GET, POST, PUT y DELETE y enviar automáticamente el token en el header Authorization.

### Components

Contienen componentes reutilizables como tarjetas, formularios, spinner de carga y elementos visuales compartidos.

### Autenticación y Seguridad

La autenticación se basa en OAuth 2.0 utilizando access tokens generados por el backend.

### Flujo de autenticación:

El usuario ingresa sus credenciales en el formulario de login.

El frontend envía la solicitud al endpoint /o/token/.

El backend devuelve un access_token.

El token se almacena en el navegador (localStorage).

Todas las peticiones posteriores incluyen el header Authorization con el esquema Bearer.

Si el token no es válido o no existe, el usuario no puede acceder a las rutas protegidas.

### Funcionalidades Implementadas

El sistema permite realizar las siguientes operaciones:

### Directores
Listar directores.
Crear nuevos directores.
Editar información existente.
Eliminar directores.

### Películas
Listar películas.
Crear nuevas películas.
Editar información existente.
Eliminar películas.

Todas las operaciones se realizan consumiendo los endpoints protegidos del backend.

### Flujo de Comunicación Frontend-Backend

El flujo general del sistema es el siguiente:

El usuario inicia sesión.

Se obtiene un token OAuth 2.0.

El frontend almacena el token.

Las peticiones incluyen el token en el header Authorization.

El backend valida el token y responde en formato JSON.

React actualiza la interfaz automáticamente según la respuesta.

Instalación del Ambiente

### Requisitos

Node.js 18 o superior.
NPM o Yarn.
Backend en ejecución.

### Instalación de dependencias

Ubicarse en la carpeta del proyecto frontend y ejecutar:

npm install

Ejecución del Proyecto

### Para iniciar el servidor de desarrollo:

npm run dev

### La aplicación estará disponible en:

http://localhost:5173/

### Integración con el Backend

El frontend consume la API que se encuentra en:

http://127.0.0.1:8000/api/

Es necesario que el backend esté ejecutándose para que el sistema funcione correctamente.

### Estado del Proyecto

El frontend se encuentra completamente funcional, con CRUD implementado para ambas entidades, autenticación OAuth 2.0 operativa, rutas protegidas, comunicación segura con el backend e interfaz desarrollada con Material UI.

### Autor

-Steven Gallegos
-Ingeniería de Software UISEK

### Nota Final

Este frontend corresponde a la segunda parte del proyecto Full-Stack y trabaja en conjunto con el backend desarrollado en Django. Ambas aplicaciones están desacopladas y se comunican mediante una API REST segura con autenticación basada en tokens.
