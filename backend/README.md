## Arquitectura del Proyecto – Patrón MVC para API REST
    Este proyecto está organizado utilizando el patrón MVC (Modelo - Vista - Controlador) adaptado para una API RESTful, donde se separan claramente las responsabilidades para mayor escalabilidad, mantenibilidad y reutilización.

    Estructura.
    backend/
│
├── controllers/         # Controladores: gestionan la lógica de negocio y responden a las peticiones
│   └── UserController.js
│
├── models/              # Modelos: ejecutan consultas a la base de datos y representan entidades
│   └── User.js
│
├── routes/              # Rutas: definen los endpoints y delegan en los controladores
│   └── userRoutes.js
│
├── database/            # Conexión a la base de datos
│   └── connectiondb.js
│
├── app.js               # Configuración de Express y middlewares
└── server.js            # Punto de entrada: inicializa el servidor


