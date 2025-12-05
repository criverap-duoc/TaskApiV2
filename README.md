📌 TaskApiV2

Aplicación sencilla de gestión de tareas desarrollada con ASP.NET Core y React. Incluye funciones básicas y algunas extensiones útiles, como priorización, etiquetas, filtros y manejo de fechas. El objetivo del proyecto es mostrar una implementación clara y ordenada de una API REST junto a un frontend funcional.

🚀 Funcionalidades principales
🖥 Backend (ASP.NET Core)

API REST con endpoints CRUD.

Controlador TaskController con rutas:

GET /api/task — obtener todas las tareas

GET /api/task/{id} — obtener por ID

POST /api/task — crear tarea

PUT /api/task/{id} — actualizar

PATCH /api/task/toggle/{id} — marcar como completada

PATCH /api/task/archive/{id} — archivar

GET /api/task/search?q= — búsqueda por texto

GET /api/task/tag/{tag} — filtrar por etiqueta

GET /api/task/expired — tareas vencidas

GET /api/task/duesoon?hours= — próximas a vencer

🧠 Modelo de datos (TaskItem)

Título

Descripción

Estado (IsDone)

Fecha de creación

Fecha límite opcional

Lista de etiquetas

Nivel de prioridad (Low / Medium / High)

Estado de archivado

🎨 Frontend (React)

Formulario para crear tareas con:

Título

Descripción

Fecha límite

Etiquetas

Prioridad

Lista de tareas con acciones básicas.

Comunicación con el backend mediante fetch.

Estilos simples usando CSS modular.

🔧 Tecnologías utilizadas
Backend

C#

ASP.NET Core 8

Entity Framework Core (si se habilita persistencia)

LINQ

Frontend

React

JavaScript

CSS

🆚 Diferencias respecto a TaskApi V1

Estructura más clara en controladores y repositorio.

Nuevas funcionalidades: búsqueda, filtros, archivado, prioridades y fechas límite.

Modelo más completo (Tags, Deadline, CreatedAt, PriorityLevel).

Frontend ampliado con formularios y visualización más completa.

Manejo más claro de errores y validaciones.

🧪 Ejecución
Backend:
dotnet run


Disponible en:
http://localhost:5087/api/task

Frontend:
npm install
npm start


Disponible en:
http://localhost:3000

📦 Estructura del Proyecto

El repositorio está organizado en dos partes principales: backend (API en ASP.NET Core) y frontend (aplicación React).

📁 TaskApiV2
│
├── 🧩 Backend (ASP.NET Core 8 API)
│   └── TaskApiV2
│       ├── Controllers/         → Endpoints REST
│       ├── Models/              → Entidades del dominio (Task)
│       ├── Services/            → Lógica de acceso a datos (TaskRepository)
│       ├── Configuration        → appsettings.json
│       ├── Program.cs           → Configuración de la API
│       ├── TaskApiV2.csproj
│       ├── TaskApiV2.sln
│       └── tasks.json           → Base de datos local en JSON
│
└── 🎨 Frontend (React)
    └── taskapp
        ├── public/
        ├── src/
        │   ├── components/      → UI modular (Header, TaskForm, TaskItem, TaskList)
        │   ├── Api.js           → Conexión con la API
        │   ├── App.js           → App principal
        │   ├── index.js         → Punto de entrada
        │   ├── Dark.css         → Modo oscuro
        │   └── estilos varios
        ├── package.json
        └── .gitignore
