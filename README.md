# 🎓 Sistema de Gestión Educativa

> Aplicación web desarrollada con Angular 17 para la administración integral de cursos, usuarios y procesos académicos en instituciones educativas.

![Angular](https://img.shields.io/badge/Angular-17-red?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#️-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución](#️-ejecución)
- [Credenciales de Prueba](#-credenciales-de-prueba)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades por Rol](#-funcionalidades-por-rol)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Autor](#-autor)

---

## ✨ Características

### 🔐 Seguridad
- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Guards de autenticación (AuthGuard)
- ✅ Guards de autorización por roles (RoleGuard)
- ✅ Interceptores HTTP para inyección automática de tokens
- ✅ Protección de rutas según permisos

### 👥 Gestión de Usuarios
- ✅ CRUD completo de usuarios (solo Admin)
- ✅ Roles diferenciados: Administrador, Profesor, Estudiante
- ✅ Activación/desactivación de usuarios
- ✅ Perfil de usuario editable

### 📚 Gestión de Cursos
- ✅ CRUD completo de cursos (Admin y Profesores)
- ✅ Búsqueda en tiempo real por nombre, descripción o profesor
- ✅ Validación de créditos (1-10)
- ✅ Asignación de profesores a cursos

### 🎯 Sistema de Inscripciones ⭐ DESTACADO
- ✅ Inscripción y desinscripción de cursos para estudiantes
- ✅ Vista de cursos inscritos con información completa
- ✅ Vista de cursos disponibles para inscripción
- ✅ Búsqueda instantánea de cursos
- ✅ Notificaciones Toast de éxito/error
- ✅ Actualización automática de estadísticas en dashboard

### 📊 Dashboard Dinámico
- ✅ Estadísticas reales cargadas desde la base de datos
- ✅ Vista personalizada según el rol del usuario
- ✅ Accesos rápidos a funcionalidades principales
- ✅ Contadores dinámicos (usuarios, cursos, inscripciones)

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno y responsivo
- ✅ Notificaciones Toast con 4 tipos (success, error, warning, info)
- ✅ Búsqueda en tiempo real
- ✅ Paginación de resultados
- ✅ Estados de carga y mensajes de error amigables
- ✅ Single Page Application (SPA) con navegación fluida

---

## 🛠️ Tecnologías

### Frontend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Angular** | 17.0.0 | Framework principal con standalone components |
| **TypeScript** | 5.2.2 | Lenguaje de programación con tipado estático |
| **RxJS** | 7.8.0 | Programación reactiva con Observables |
| **Reactive Forms** | - | Gestión de formularios con validación |

### Backend (Simulado)
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **JSON Server** | 0.17.4 | API REST simulada para desarrollo |
| **Concurrently** | 9.2.1 | Ejecución simultánea de servidores |

### Herramientas de Desarrollo
- Angular CLI 17.0.0
- Node.js 18+
- NPM 9+
- Concurrently 9.2.1 (ejecución simultánea de comandos)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
  - Descargar: https://nodejs.org/
  - Verificar instalación: `node --version`

- **NPM** (versión 9 o superior)
  - Viene incluido con Node.js
  - Verificar instalación: `npm --version`

- **Git** (opcional, para clonar el repositorio)
  - Descargar: https://git-scm.com/

---

## 🚀 Instalación

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/sistema-gestion-educativa.git
cd sistema-gestion-educativa
```

O descarga el ZIP y descomprímelo.

### Paso 2: Instalar dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias del proyecto (puede tardar 1-2 minutos), incluyendo:
- Angular 17 y sus módulos
- TypeScript
- RxJS
- JSON Server (backend simulado)
- **Concurrently** (para ejecutar múltiples comandos)
- Todas las demás dependencias del proyecto

---

## ▶️ Ejecución

### 🔄 ¿Qué es Concurrently?

Este proyecto utiliza **Concurrently** para ejecutar múltiples comandos simultáneamente en una sola terminal.

**¿Por qué es útil?**
- ✅ Ejecuta el backend (JSON Server) y frontend (Angular) al mismo tiempo
- ✅ Un solo comando en lugar de dos terminales separadas
- ✅ Simplifica el flujo de desarrollo
- ✅ Los procesos se detienen juntos con `Ctrl+C`

**Sin Concurrently necesitarías:**
```bash
# Terminal 1
npm run api

# Terminal 2 (en otra ventana)
ng serve --open
```

**Con Concurrently solo necesitas:**
```bash
npm run dev
```

### Opción 1: Ejecutar todo con un solo comando (Recomendado) ⭐

```bash
npm run dev
```

Este comando usa **Concurrently** para iniciar:
- ✅ JSON Server en `http://localhost:3000` (Backend simulado)
- ✅ Angular en `http://localhost:4200` (Frontend)
- ✅ Abre automáticamente el navegador

### Opción 2: Ejecutar manualmente

**Terminal 1 - JSON Server:**
```bash
npm run api
```

**Terminal 2 - Angular:**
```bash
npm start
```

### Verificar que todo funciona

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000
- **Usuarios:** http://localhost:3000/usuarios
- **Cursos:** http://localhost:3000/cursos
- **Inscripciones:** http://localhost:3000/inscripciones

---

## 🔑 Credenciales de Prueba

### Administrador
```
Email: admin@universidad.edu
Password: admin123
```
**Permisos:** Gestión de usuarios, cursos, acceso completo al sistema

### Profesor
```
Email: jperez@universidad.edu
Password: prof123
```
**Permisos:** Gestión de cursos, visualización de estudiantes

### Estudiante
```
Email: mgarcia@universidad.edu
Password: est123
```
**Permisos:** Inscripción a cursos, visualización de cursos inscritos

### Otros usuarios disponibles:
- **Profesor:** `crodriguez@universidad.edu` / `prof123`
- **Estudiante:** `alopez@universidad.edu` / `est123`

---

## 📁 Estructura del Proyecto

```
sistema-gestion-educativa/
│
├── src/
│   ├── app/
│   │   ├── core/                        # Servicios fundamentales
│   │   │   ├── guards/                  # Protección de rutas
│   │   │   │   ├── auth.guard.ts        # Guard de autenticación
│   │   │   │   └── role.guard.ts        # Guard de roles
│   │   │   ├── interceptors/            # Interceptores HTTP
│   │   │   │   ├── jwt.interceptor.ts   # Inyección de JWT
│   │   │   │   └── error.interceptor.ts # Manejo de errores
│   │   │   ├── services/                # Servicios de negocio
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── usuarios.service.ts
│   │   │   │   ├── cursos.service.ts
│   │   │   │   └── inscripciones.service.ts
│   │   │   └── models/                  # Interfaces TypeScript
│   │   │       ├── user.model.ts
│   │   │       ├── course.model.ts
│   │   │       └── inscripcion.model.ts
│   │   │
│   │   ├── features/                    # Módulos funcionales
│   │   │   ├── auth/login/              # Componente de login
│   │   │   ├── dashboard/               # Dashboard principal
│   │   │   ├── cursos/                  # Gestión de cursos
│   │   │   ├── usuarios/                # Gestión de usuarios
│   │   │   ├── mis-cursos/              # Inscripciones (estudiantes)
│   │   │   └── perfil/                  # Perfil de usuario
│   │   │
│   │   ├── shared/                      # Componentes compartidos
│   │   │   ├── components/
│   │   │   │   ├── toast/               # Notificaciones
│   │   │   │   ├── search-bar/          # Búsqueda reutilizable
│   │   │   │   ├── pagination/          # Paginación
│   │   │   │   └── unauthorized/        # Página de acceso denegado
│   │   │   └── services/
│   │   │       └── toast.service.ts
│   │   │
│   │   ├── app.component.ts             # Componente raíz
│   │   ├── app.routes.ts                # Configuración de rutas
│   │   └── app.config.ts                # Configuración global
│   │
│   ├── assets/                          # Recursos estáticos
│   ├── styles.css                       # Estilos globales
│   └── index.html                       # HTML principal
│
├── db.json                              # Base de datos JSON Server
├── package.json                         # Dependencias del proyecto
├── angular.json                         # Configuración de Angular
├── tsconfig.json                        # Configuración de TypeScript
└── README.md                            # Este archivo
```

---

## 👤 Funcionalidades por Rol

### 🔴 Administrador
- ✅ Dashboard con estadísticas completas (usuarios y cursos)
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Gestión completa de cursos (CRUD)
- ✅ Búsqueda en tiempo real de usuarios y cursos
- ✅ Activar/desactivar usuarios
- ✅ Asignar roles a usuarios
- ✅ Acceso a todas las funcionalidades del sistema

### 🔵 Profesor
- ✅ Dashboard con estadísticas de cursos
- ✅ Gestión de cursos (CRUD)
- ✅ Búsqueda en tiempo real de cursos
- ✅ Ver información de estudiantes inscritos
- ✅ Gestión de perfil personal

### 🟢 Estudiante
- ✅ Dashboard personalizado con cursos inscritos
- ✅ Vista de "Mis Cursos" con cursos inscritos y disponibles
- ✅ Inscripción a cursos disponibles
- ✅ Desinscripción de cursos
- ✅ Búsqueda en tiempo real de cursos
- ✅ Notificaciones de inscripción/desinscripción
- ✅ Gestión de perfil personal

---

## 🌐 Endpoints de la API

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth` | Login con email y password |

### Usuarios
| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| GET | `/usuarios` | Listar todos los usuarios | Admin |
| GET | `/usuarios/:id` | Obtener usuario por ID | Admin |
| POST | `/usuarios` | Crear nuevo usuario | Admin |
| PUT | `/usuarios/:id` | Actualizar usuario | Admin |
| DELETE | `/usuarios/:id` | Eliminar usuario | Admin |

### Cursos
| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| GET | `/cursos` | Listar todos los cursos | Todos |
| GET | `/cursos/:id` | Obtener curso por ID | Todos |
| POST | `/cursos` | Crear nuevo curso | Admin, Profesor |
| PUT | `/cursos/:id` | Actualizar curso | Admin, Profesor |
| DELETE | `/cursos/:id` | Eliminar curso | Admin, Profesor |

### Inscripciones
| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| GET | `/inscripciones` | Listar todas las inscripciones | Todos |
| GET | `/inscripciones?usuarioId=:id` | Inscripciones por usuario | Estudiante |
| POST | `/inscripciones` | Inscribirse a un curso | Estudiante |
| DELETE | `/inscripciones/:id` | Desinscribirse de un curso | Estudiante |


## 🐛 Solución de Problemas

### Concurrently no funciona

Si recibes un error de "concurrently: command not found":

```bash
# Reinstalar concurrently
npm install --save-dev concurrently

# O instalar globalmente
npm install -g concurrently
```

### El puerto 4200 ya está en uso
```bash
# Windows
netstat -ano | findstr :4200
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:4200 | xargs kill -9
```

### El puerto 3000 ya está en uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: Cannot find module
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

### La aplicación no carga datos
Verifica que JSON Server esté corriendo en http://localhost:3000

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | **Recomendado:** Inicia JSON Server + Angular simultáneamente usando Concurrently |
| `npm run api` | Solo inicia JSON Server (puerto 3000) |
| `npm start` | Solo inicia Angular (puerto 4200) |
| `npm run build` | Compila el proyecto para producción |
| `npm test` | Ejecuta las pruebas unitarias |

### 💡 Detalle del comando `npm run dev`

Este comando ejecuta internamente:
```bash
concurrently "npm run api" "ng serve --open" --kill-others
```

**¿Qué hace cada parte?**
- `"npm run api"` → Inicia JSON Server
- `"ng serve --open"` → Inicia Angular y abre el navegador
- `--kill-others` → Si uno falla, detiene todos los procesos

---

## 📚 Documentación Técnica

### Arquitectura
El proyecto sigue una arquitectura por capas:
- **Core:** Servicios fundamentales, guards, interceptores
- **Features:** Módulos funcionales por característica
- **Shared:** Componentes y servicios reutilizables

### Patrones Implementados
- **Service Layer:** Separación de lógica de negocio
- **Component Composition:** Componentes reutilizables
- **Observable Pattern:** Programación reactiva con RxJS
- **RBAC (Role-Based Access Control):** Control de acceso basado en roles
- **Lazy Loading:** Carga diferida de módulos
- **Dependency Injection:** Inyección de dependencias de Angular

### Guards
- **AuthGuard:** Verifica que el usuario esté autenticado
- **RoleGuard:** Verifica que el usuario tenga el rol necesario

### Interceptores
- **JWTInterceptor:** Inyecta automáticamente el token en las peticiones HTTP
- **ErrorInterceptor:** Maneja errores HTTP globalmente

---

## 🚀 Compilación para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

Para desplegar en un servidor:
1. Copia el contenido de `dist/` a tu servidor
2. Configura el servidor para redirigir todas las rutas a `index.html`
3. Asegúrate de que la API esté disponible en producción

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de un proyecto académico para IDAT.

---



## 🙏 Agradecimientos

- Angular Team por el excelente framework
- JSON Server por facilitar el desarrollo con API simulada
- La comunidad de desarrolladores por su documentación y recursos

---

## 📞 Contacto

Si tienes preguntas sobre el proyecto, no dudes en contactarme.

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ y ☕ por Omar Cordova Pintado

</div>
