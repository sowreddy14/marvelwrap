# 🦸 MarvelWrap

<p align="center">
  <b>A Full-Stack MCU Analytics Experience Inspired by Spotify Wrapped</b>
</p>

<p align="center">
  Transform your Marvel Cinematic Universe watch history into an immersive animated story experience.
</p>

---

## 🚀 Live Deployments

| Service | Link |
|----------|------|
| 🎨 Frontend | https://marvelwrap.vercel.app/ |
| ⚡ Backend API | https://marvelwrap-backend.onrender.com |

---

# ✨ Features

- 🎬 MCU movie watch analytics
- 📊 Personalized viewing insights
- ⚡ Smooth animated slideshow transitions
- 🧠 Favorite MCU phase detection
- 🦸 Hero personality statistics
- 🚀 Redis-powered caching layer
- 🔒 Secure PostgreSQL integration
- 🌐 Full-stack deployment architecture
- 📱 Responsive mobile-first UI
- 🛠️ CI/CD automation pipeline

---

# 🏗️ Tech Stack

## 🎨 Frontend

| Technology | Purpose |
|------------|---------|
| Next.js 14 | Frontend Framework |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | Global State Management |

---

## ⚡ Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | API Framework |
| TypeScript | Backend Type Safety |
| PostgreSQL | Primary Database |
| Redis | Caching Layer |

---

## ⚙️ DevOps

| Technology | Purpose |
|------------|---------|
| GitHub Actions | CI/CD |
| Vercel | Frontend Hosting |
| Render | Backend Hosting |

---

# 🧩 System Architecture

```text
┌──────────────────────────────────────┐
│        Next.js Frontend (Vercel)    │
└──────────────────┬───────────────────┘
                   │ REST API
                   ▼
┌──────────────────────────────────────┐
│    Express + TypeScript Backend     │
│             (Render)                │
└───────────────┬───────────────┬──────┘
                │               │
                ▼               ▼
        ┌─────────────┐   ┌─────────────┐
        │ PostgreSQL  │   │    Redis    │
        │   Database  │   │    Cache    │
        └─────────────┘   └─────────────┘
```

---

# 📁 Project Structure

```text
MarvelWrap/
│
├── frontend/                 # Next.js Frontend
├── backend/                  # Express Backend
├── .github/
│   └── workflows/            # CI/CD Pipelines
│
└── README.md
```

---

# ⚙️ Local Development Setup

## 📌 Prerequisites

Make sure the following are installed:

- Node.js v20+
- PostgreSQL
- Redis (optional for local caching)

---

# 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:

```env
PORT=10000
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/marvelwrap
NODE_ENV=development
```

Run the backend server:

```bash
npm run dev
```

---

# 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:10000
```

Run the frontend application:

```bash
npm run dev
```

---

# 🛡️ Database Initialization

Initialize the PostgreSQL schema using:

```bash
curl -X POST https://marvelwrap-backend.onrender.com/api/db/init
```

---

# ⚡ CI/CD Pipeline

GitHub Actions automatically validates and builds the project on every push and pull request.

```yaml
name: MarvelWrap Full-Stack CI/CD Pipeline

on: [push, pull_request]

jobs:
  audit-and-verify:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Verify Backend
        run: |
          cd backend
          npm ci
          npx tsc --noEmit

      - name: Verify Frontend
        run: |
          cd frontend
          npm ci
          npm run build
```

---

# 🌟 Future Improvements

- 🔐 User Authentication & Profiles
- 🧠 AI-generated watch summaries
- 📈 Advanced analytics dashboard
- 🎵 MCU soundtrack integration
- 🏆 Shareable Wrapped cards
- 🌍 Social leaderboard support
- ☁️ Multi-region backend deployment
- 📊 Real-time watch statistics

---

# 🤝 Contributing

Contributions are welcome and appreciated.

## Steps to Contribute

```bash
# Fork the repository

# Clone your fork
git clone https://github.com/your-username/marvelwrap.git

# Move into the project directory
cd marvelwrap

# Create a new branch
git checkout -b feature/amazing-feature

# Install dependencies
npm install

# Commit your changes
git commit -m "Add amazing feature"

# Push changes
git push origin feature/amazing-feature
```

Then create a Pull Request 🚀

---

# 🛠️ Available Scripts

## Frontend

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
```

## Backend

```bash
npm run dev       # Start backend server
npm run build     # Build backend
npm run start     # Start production backend
```

---

# 📜 License

MIT License

Copyright (c) 2026 MarvelWrap

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

---

# 💥 Inspiration

MarvelWrap was inspired by the storytelling experience of Spotify Wrapped and reimagined for Marvel fans who love cinematic analytics, immersive UI experiences, and personalized entertainment data.

---

# ❤️ Built For Marvel Fans

> “Part of the journey is the end.” — Tony Stark

<p align="center">
  ⭐ If you like this project, consider giving it a star on GitHub!
</p>