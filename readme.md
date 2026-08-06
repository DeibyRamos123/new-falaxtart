# 🎮 New Falax

> Una red social moderna para gamers desarrollada con Django y React.

![Status](https://img.shields.io/badge/status-En%20desarrollo-orange)
![Backend](https://img.shields.io/badge/backend-Django-092E20)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## 📖 Acerca del proyecto

New Falax es una red social diseñada para jugadores, donde los usuarios pueden crear un perfil, compartir publicaciones, descubrir contenido de videojuegos e interactuar con otros miembros de la comunidad.

El objetivo del proyecto es construir una plataforma rápida, moderna y escalable utilizando tecnologías actuales del desarrollo web.

---

## ✨ Características

- 👤 Autenticación con JWT
- 📝 Publicaciones
- ❤️ Sistema de likes
- 💬 Comentarios
- 👥 Seguir usuarios
- 🔔 Notificaciones
- 🎨 Personalización del perfil
- 🌙 Tema oscuro
- ⭐ Sistema Premium *(planeado)*

---

## 🛠️ Tecnologías

### Backend

- Django
- Django REST Framework
- PostgreSQL

### Frontend

- React
- React Router
- Axios
- Vite

---

## 📂 Arquitectura

```
new-falax/

backend/
│
├── apps/
├── users/
├── posts/
├── comments/
├── notifications/
└── config/

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   └── assets/
```

---

## 🚀 Instalación

### Clonar el proyecto

```bash
git clone https://github.com/tuusuario/new-falax.git
```

### Backend

```bash
cd backend

python -m venv venv

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📸 Capturas

(Aquí van imágenes)

---

## 📅 Roadmap

- [x] Sistema de autenticación
- [x] Perfil de usuario
- [x] Publicaciones
- [ ] Likes
- [x] Comentarios
- [ ] Chat en tiempo real
- [ ] Notificaciones
- [ ] Búsqueda
- [ ] Responsive

---

## 📄 Licencia

MIT