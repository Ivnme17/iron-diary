# DiarioDeHierro - Gym Tracker

Aplicación web para tracking de entrenamientos con backend en Python (FastAPI) y frontend en Astro.

## Características

- Registro e inicio de sesión de usuarios
- Creación, edición y eliminación de entrenamientos
- Gestión de ejercicios con series, repeticiones y peso
- Diseño responsive con TailwindCSS
- Autenticación con JWT

## Tecnologías

### Backend
- **FastAPI** - Framework web de Python
- **SQLAlchemy** - ORM para base de datos
- **PostgreSQL/SQLite** - Base de datos
- **JWT** - Autenticación
- **Pydantic** - Validación de datos

### Frontend
- **Astro** - Framework web moderno
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework CSS
- **JavaScript vanilla** - Interactividad

## Estructura del Proyecto

```
DiarioDeHierro_Astro_Python/
├── backend/                 # Backend FastAPI
│   ├── app/
│   │   ├── models/         # Modelos de base de datos
│   │   ├── schemas/        # Esquemas Pydantic
│   │   ├── routers/        # Endpoints de la API
│   │   ├── utils/          # Utilidades (auth, etc.)
│   │   └── config.py       # Configuración
│   ├── main.py            # Aplicación principal
│   └── requirements.txt   # Dependencias Python
├── frontend/               # Frontend Astro
│   ├── src/
│   │   ├── layouts/       # Layouts de Astro
│   │   └── pages/         # Páginas de la aplicación
│   ├── astro.config.mjs   # Configuración de Astro
│   ├── package.json       # Dependencias Node.js
│   └── tailwind.config.mjs # Configuración de Tailwind
└── README.md              # Este archivo
```

## Instalación y Ejecución

### Prerrequisitos

- Python 3.8+
- Node.js 18+
- npm o yarn

### Backend

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Crear entorno virtual:
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Iniciar el servidor:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en `http://localhost:8000`

### Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

## Uso

1. **Registro**: Accede a `/auth` y crea una cuenta nueva
2. **Login**: Inicia sesión con tus credenciales
3. **Dashboard**: Visualiza tus entrenamientos en `/dashboard`
4. **Crear Entrenamiento**: Añade nuevos entrenamientos en `/workout/new`
5. **Editar Entrenamiento**: Modifica entrenamientos existentes en `/workout/[id]`

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Obtener usuario actual

### Entrenamientos
- `GET /api/workouts` - Listar entrenamientos del usuario
- `POST /api/workouts` - Crear nuevo entrenamiento
- `GET /api/workouts/{id}` - Obtener entrenamiento específico
- `PUT /api/workouts/{id}` - Actualizar entrenamiento
- `DELETE /api/workouts/{id}` - Eliminar entrenamiento

## Variables de Entorno

Opcionalmente puedes crear un archivo `.env` en el directorio `backend/`:

```env
DATABASE_URL=sqlite:///./diariodehierro.db
SECRET_KEY=tu-clave-secreta-aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Contribuir

1. Fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
