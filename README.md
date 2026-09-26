# 🎬 Películas y Directores — Frontend

Aplicación web desarrollada con **React** que forma parte de un proyecto **Full Stack** para la gestión de películas y directores.

El frontend proporciona una interfaz gráfica para consumir una **API REST desarrollada con Django REST Framework**, permitiendo administrar información mediante operaciones CRUD y controlar el acceso mediante autenticación **OAuth 2.0**.

---

## 📌 Descripción del proyecto

Este proyecto corresponde al frontend de una aplicación Full Stack desarrollada para centralizar la gestión de películas y directores.

La aplicación permite consultar, registrar, editar y eliminar información desde una interfaz web, relacionando cada película con su respectivo director.

El frontend se comunica con el backend mediante peticiones HTTP y utiliza autenticación basada en tokens para acceder a las operaciones protegidas de la API.

Entre sus principales responsabilidades se encuentran:

- Consumir los endpoints REST proporcionados por el backend.
- Gestionar la autenticación mediante OAuth 2.0.
- Realizar operaciones CRUD sobre películas y directores.
- Relacionar películas con sus respectivos directores.
- Presentar la información mediante una interfaz clara y organizada.
- Mantener separada la lógica de interfaz y la comunicación con la API.

---

## 🎯 Objetivos del proyecto

- Desarrollar una interfaz web utilizando React.
- Consumir una API REST desarrollada con Django REST Framework.
- Implementar autenticación basada en tokens mediante OAuth 2.0.
- Realizar operaciones CRUD desde el cliente.
- Gestionar la relación entre películas y directores.
- Aplicar separación de responsabilidades dentro del frontend.
- Integrar correctamente el frontend con el backend.

---

## 🛠️ Tecnologías utilizadas

- **React**
- **JavaScript (ES6+)**
- **Vite**
- **React Router DOM**
- **Axios**
- **Material UI**
- **Node.js**
- **NPM / Yarn**
- **OAuth 2.0**

---

## ✨ Funcionalidades implementadas

### 🎬 Películas

La aplicación permite:

- Listar películas.
- Consultar información de una película.
- Registrar nuevas películas.
- Editar películas existentes.
- Eliminar películas.
- Asociar cada película con un director.

### 🎥 Directores

La aplicación permite:

- Listar directores.
- Consultar información de un director.
- Registrar nuevos directores.
- Editar información existente.
- Eliminar directores.
- Visualizar las películas relacionadas con cada director.

### 🔐 Autenticación

El sistema incluye:

- Inicio de sesión.
- Obtención de access token mediante OAuth 2.0.
- Almacenamiento del token en el navegador.
- Envío del token mediante el esquema Bearer.
- Protección del acceso a las funcionalidades que requieren autenticación.

---

## 🏗️ Arquitectura del proyecto

El frontend está organizado aplicando el principio de **separación de responsabilidades**, dividiendo la interfaz, la comunicación con la API y los componentes reutilizables.

### Pages

Contiene las principales pantallas de la aplicación, como:

- Login.
- Lista de películas.
- Lista de directores.
- Detalle de películas.
- Detalle de directores.
- Formularios de creación y edición.

### Services

Contiene la lógica encargada de comunicarse con la API REST mediante Axios.

Entre sus responsabilidades se encuentran:

- Realizar peticiones HTTP.
- Gestionar la autenticación.
- Enviar el access token.
- Consumir los endpoints del backend.
- Gestionar operaciones GET, POST, PUT y DELETE.

### Components

Contiene componentes reutilizables utilizados en diferentes partes de la aplicación, como:

- Formularios.
- Tarjetas.
- Indicadores de carga.
- Elementos visuales compartidos.

---

## 🔐 Autenticación y seguridad

La autenticación se basa en **OAuth 2.0**, utilizando access tokens generados por el backend.

### Flujo de autenticación

1. El usuario ingresa sus credenciales en el formulario de inicio de sesión.
2. El frontend envía la solicitud de autenticación al backend.
3. El backend valida las credenciales.
4. El backend devuelve un `access_token`.
5. El frontend almacena el token en el navegador.
6. Las peticiones posteriores incluyen el token mediante el esquema `Bearer`.
7. El backend valida el token antes de permitir el acceso a los recursos protegidos.

Si el token no existe o no es válido, el usuario no puede acceder a las operaciones protegidas.

---

## 🔄 Comunicación Frontend — Backend

El flujo general de comunicación es:

```text
Usuario
   ↓
React
   ↓
Axios
   ↓
API REST
   ↓
Django REST Framework
   ↓
Base de datos
```

El frontend envía las solicitudes al backend utilizando Axios.

El backend procesa las peticiones, realiza las operaciones correspondientes y devuelve las respuestas en formato JSON.

React utiliza la información recibida para actualizar dinámicamente la interfaz.

---

## 📋 Requisitos

Antes de ejecutar el proyecto es necesario contar con:

- **Node.js 18 o superior.**
- **NPM o Yarn.**
- **Backend del proyecto configurado y en ejecución.**
- **Aplicación OAuth 2.0 configurada en el backend.**
- **Variables de entorno del frontend correctamente configuradas.**

---

## ⚙️ Variables de entorno

El frontend requiere variables de entorno para establecer la comunicación con el backend y gestionar la autenticación.

Crear un archivo `.env` en el proyecto utilizando como referencia la siguiente estructura:

```env
VITE_API_BASE=http://127.0.0.1:8000
VITE_CLIENT_ID=tu_client_id
VITE_CLIENT_SECRET=tu_client_secret
```

> **Importante:** no se deben publicar credenciales reales en el repositorio. El archivo `.env` debe permanecer excluido mediante `.gitignore`.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

Ejecutar:

```bash
git clone https://github.com/stevengallegos-dev/peliculas-directores-frontend.git
```

### 2. Ingresar al proyecto

```bash
cd peliculas-directores-frontend
```

Si la aplicación se encuentra dentro de la carpeta `app`:

```bash
cd app
```

### 3. Instalar las dependencias

Utilizando NPM:

```bash
npm install
```

También puede utilizarse Yarn:

```bash
yarn install
```

### 4. Configurar las variables de entorno

Crear el archivo:

```text
.env
```

y configurar las variables necesarias para la conexión con el backend y la autenticación OAuth 2.0.

### 5. Ejecutar el backend

Antes de iniciar el frontend, el backend debe encontrarse correctamente configurado y en ejecución.

Durante el desarrollo local, la API se encuentra normalmente disponible en:

```text
http://127.0.0.1:8000/api/
```

### 6. Ejecutar el frontend

Con NPM:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente:

```text
http://localhost:5173/
```

Abrir esta dirección en el navegador para utilizar la aplicación.

---

## 🔗 Integración con el Backend

Este frontend trabaja en conjunto con el backend desarrollado con **Django y Django REST Framework**.

Repositorio del backend:

**peliculas-directores-api**

La API proporciona los endpoints necesarios para gestionar:

- Películas.
- Directores.
- Relaciones entre películas y directores.
- Autenticación y autorización.

Para utilizar todas las funcionalidades del frontend es necesario mantener el backend en ejecución.

---

## 📂 Estructura del proyecto Full Stack

El proyecto completo está dividido en dos aplicaciones independientes:

```text
Películas y Directores
│
├── Frontend
│   ├── React
│   ├── Vite
│   ├── Material UI
│   └── Axios
│
└── Backend
    ├── Django
    ├── Django REST Framework
    ├── API REST
    └── OAuth 2.0
```

Esta separación permite mantener desacopladas la interfaz de usuario y la lógica del servidor.

Ambas aplicaciones se comunican mediante una API REST.

---

## 📊 Estado del proyecto

- ✅ Frontend funcional.
- ✅ CRUD de películas.
- ✅ CRUD de directores.
- ✅ Relación entre películas y directores.
- ✅ Consumo de API REST.
- ✅ Autenticación OAuth 2.0.
- ✅ Rutas protegidas.
- ✅ Interfaz desarrollada con Material UI.
- ✅ Integración con backend Django.

---

## 👨‍💻 Autor

**Steven Gallegos**  
Estudiante de Ingeniería de Software — UISEK

---

## 📝 Nota final

Este repositorio corresponde al **frontend** del proyecto Full Stack **Películas y Directores**.

La aplicación trabaja en conjunto con un backend desarrollado con **Django y Django REST Framework**, manteniendo ambas partes desacopladas y comunicándose mediante una API REST con autenticación basada en tokens.