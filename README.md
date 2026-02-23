# DiarioDeHierro

Aplicación de seguimiento de entrenamientos con backend FastAPI y frontend Astro.

## Estructura

- `backend/` - API FastAPI con SQLite
- `frontend/` - Frontend Astro con TailwindCSS

## Configuración

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Acceso

- Frontend: http://localhost:4321
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
