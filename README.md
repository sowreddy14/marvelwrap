# 🎬 MarvelWrap

MarvelWrap is an interactive web application inspired by the Spotify Wrapped format, built for the Marvel Cinematic Universe (MCU). It analyzes a user's logged MCU movie-watching history to generate a high-energy, mobile-like slideshow showing stats like total watch time, favorite MCU phase, and top superhero personas.

---

## 🏛️ Tech Stack

- **Frontend:** Next.js + TypeScript
- **Styling & Animations:** Tailwind CSS + Framer Motion
- **State Management:** Zustand
- **Backend API:** Node.js + TypeScript
- **Database:** PostgreSQL
- **Caching Layer:** Redis
- **CI/CD:** GitHub Actions

---

## 🗄️ Database Setup

Run these SQL queries to set up your PostgreSQL database tables:

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MCU Movies Metadata
CREATE TABLE mcu_movies (
    id INT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    phase VARCHAR(20) NOT NULL,
    runtime_minutes INT NOT NULL,
    poster_path VARCHAR(255),
    release_date DATE
);

-- User Watch History (Junction Table)
CREATE TABLE user_watch_history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    movie_id INT REFERENCES mcu_movies(id) ON DELETE CASCADE,
    watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, movie_id)
);
```

---

## 🛠️ Installation & Run Guide

### 1. Clone the Project & Install Dependencies

```bash
git clone https://github.com/yourusername/marvelwrap.git
cd marvelwrap

# Install Backend
cd backend && npm install

# Install Frontend
cd ../frontend && npm install
```

---

### 2. Environment Configuration

Create a `.env` file in your `/backend` folder:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/marvelwrap
REDIS_URL=redis://localhost:6379
```

Create a `.env.local` file in your `/frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 3. Run the App Locally

#### Start Backend Server

```bash
cd backend
npm run dev
```

#### Start Frontend Server

```bash
cd frontend
npm run dev
```

Open `http://localhost:3000` in your web browser to view the application!