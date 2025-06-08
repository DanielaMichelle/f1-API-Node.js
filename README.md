# 🏎️ **Formula 1 API - Dockerized API Restful**

Sistema de gestión de datos de Fórmula 1. Permite gestionar pilotos, equipos, temporadas y más. Construido con Node.js, PostgreSQL y Prisma, usando Docker para facilitar el despliegue.

---
## 📦 **Tecnologías Usadas**
- **Node.js** 🚀 para la creación de la API Restful
- **PostgreSQL** para la base de datos relacional
- **Prisma ORM** para la interacción con la base de datos, tipado seguro y migraciones
- **TypeScript** para un código robusto y tipado
- **Docker** 🐳 para la contenedorización y orquestación
- **Express.js** como framework web para Node.js
- **Postman** 📝 para probar la API y ver la documentación
- **jwt** para autenticación y autorización basada en tokens seguros
- **bcrypt** para el hash seguro de contraseñas de usuarios
---

## 🛠️ **Requisitos Técnicos**

Antes de comenzar, asegúrate de tener los siguientes requisitos:

- Docker 🔵 (Y Docker Compose si deseas usar la configuración del contenedor)
- Postman para probar la API 📝
  
---

## 🏃‍♂️ **Pasos para iniciar la aplicación con Docker**

1. **Clonar el repositorio**
   Primero, clona el repositorio del proyecto en tu máquina local:
   ```bash
   git clone https://github.com/DanielaMichelle/f1-API-Node.js.git
   cd f1-API-Node.js
   
2. **Configuración del Entorno (.env)**
   Crea un archivo ".env" en la raíz del proyecto y configura las variables de entorno para la conexión a la base de datos PostgreSQL
   ```bash
   PORT=
   POSTGRES_USER="name"
   POSTGRES_PASSWORD="password"
   POSTGRES_DB="database_name"
   DATABASE_URL="postgresql://name:password@localhost:5432/database_name"

3. **Contruye y despliega el contenedor con docker compose**
   ```bash
   docker-compose up -d
   
4. **Verifica que los contenedores estén corriendo**
   ```bash
   docker ps

5. **Descarga todas las dependencias del proyecto**
   ```bash
   npm install

6. **Ejecutar migraciones de Prisma**
   ```bash
   npx prisma migrate dev

7. **Llenar la base de datos con data inicial**
   ```bash
   npx prisma db seed

8. **Ejecutar proyecto**
   ```bash
   npm run dev

4. **Accede a la API**
   Tu API de Node.js estará corriendo en el puerto especificado en tu archivo .env

   Puedes probar las rutas utilizando Postman o realizar peticiones directamente desde tu navegador.
   Inicia registrando tu usuario con el endpoint `http://localhost:3000/v1/auth/register` 
   Sigue iniciando sesión con `http://localhost:3000/v1/auth/login` y consigue un token
   Y podras probar los endpoints como: `http://localhost:3000/v1/drivers`
