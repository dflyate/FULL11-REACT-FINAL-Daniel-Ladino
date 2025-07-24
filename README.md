# ProductOrderApp – Sistema de Pedidos y Gestión de Productos

Aplicación web full stack para gestionar productos, clientes y pedidos. Permite administrar categorías de productos, registrar usuarios, y generar pedidos desde una interfaz moderna e intuitiva.

---

## Tecnologías utilizadas

- **Frontend:** React, Vite, Bootstrap
- **Backend:** Node.js, Express, Prisma ORM
- **Base de datos:** MongoDB (MongoDB Atlas)

---

## Funcionalidades principales

- **Clientes:** Crear, consultar, actualizar y eliminar clientes.
- **Categorías:** CRUD de categorías para clasificar productos.
- **Productos:** Gestión completa de productos asociados a una categoría.
- **Usuarios:** Administración de usuarios con autenticación y roles.
- **Pedidos:** Registro de pedidos realizados por los clientes.

---


## 📸 Capturas de pantalla

<img width="1920" height="435" alt="image" src="https://github.com/user-attachments/assets/ae7308f0-dfde-43f3-86e1-b04837ea95b9" />

<img width="1920" height="999" alt="image" src="https://github.com/user-attachments/assets/d8448877-1c6b-41c5-aee2-bc4ff50b97b4" />

<img width="1920" height="480" alt="image" src="https://github.com/user-attachments/assets/3ddb8bdf-0098-4cd7-9c50-16ceef40bf71" />

<img width="1916" height="859" alt="image" src="https://github.com/user-attachments/assets/14b6ed82-1799-46a7-9af2-2990e9a298a4" />

<img width="1909" height="862" alt="image" src="https://github.com/user-attachments/assets/de2b45b4-c1b5-4f89-91e7-e4d04c333a70" />

<img width="1917" height="569" alt="image" src="https://github.com/user-attachments/assets/b2044e65-4a39-4a88-9c2c-14df1d81ce46" />


## Instalación y ejecución local

### Descargar el proyecto

Clonar el repositorio:

```bash
git clone https://github.com/dflyate/FULL11-REACT-FINAL-Daniel-Ladino.git
```

### PARA EL FRONTEND

- Ingresar a la carpeta `front/react`
- Abrir una consola de comandos y ejecutar:

```bash
npm install
```

- Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

- Abrir la ruta generada desde un navegador: `http://localhost:5173/`

### PARA EL BACKEND

- Ingresar a la carpeta `NodeJS`
- Abrir otra consola de comandos y ejecutar:

```bash
npm install
```

### BASE DE DATOS MONGO

- Ingresar a MongoDB Atlas: https://cloud.mongodb.com
- Autenticarse
- Crear un cluster y asignarle un nombre
- Ir a Atlas → Database Access → Add New Database User
  - Crear un usuario con contraseña
  - Asignar privilegios de lectura y escritura
- Ir a Atlas → Network Access → Add IP Address
  - Asignar la IP actual o usar `0.0.0.0/0` para desarrollo
- Obtener la cadena de conexión SRV:
  - Ir a Clusters → Connect → Connect your application
  - Copiar la cadena SRV proporcionada

### BACKEND (CONTINUACIÓN)

- En la raíz del proyecto (`NodeJS`), crear el archivo `.env`
- Añadir la variable de entorno:

```env
DATABASE_URL="mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_de_datos>"
```

- Verificar que en la carpeta `prisma` exista el archivo `schema.prisma` y que el atributo `provider` sea `mongodb`

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

- Ejecutar el backend:

```bash
npm start
```

### PROBANDO LA APLICACIÓN

- Abrir Postman y crear una nueva petición
- La petición debe ser de tipo `POST` y apuntar a la URL:

```
http://localhost:4000/api/usuarios
```

- Configurar el cuerpo de la petición como `raw / JSON` y añadir los siguientes datos:

```json
{
  "nombres": "Daniel",
  "apellidos": "Ladino",
  "correo": "correo@gmail.com",
  "clave": "clave",
  "role": "admin"
}
```

- Ejecutar la petición; esta debe arrojar un estado `201 Created`

- Acceder a la aplicación desde: `http://localhost:5173/`

- Iniciar sesión con el usuario y contraseña creados

- Podrá acceder y navegar por la aplicación
