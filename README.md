# starfy
*Live demo not available. Preview available on my portfolio.*

## About this project

This is a Spotify-inspired music player focused on scalable, maintainable architecture.

The goal was to understand how a production-level system is structured and how its components interact in a real-world full-stack application.

Instead of focusing on design novelty, the project breaks a complex product into smaller systems and rebuilds it to understand API design, backend structure, caching, data flow, and system visibility.

## Features
- Playlist pages, songs, albums, artists, and episodes views
- Music playback system (play / pause)
- Next / previous track controls
- Shuffle and repeat functionality
- Volume control
- Sidebar with user playlists
- Search songs
- Add/remove songs from favorites
- Profile page
- Lyrics display integration
- Authentication system

### Architecture highlights
- RESTful API design
- Separation between client and server
- MVC backend structure
- Token-based authentication with Redis session storage, HTTP-only cookies, and automatic session refresh on expiry
- State management with TanStack Query (server-state handling and request caching)
- Infinite pagination for search results
- Containerized full-stack environment with Docker
- Observability with structured logging and request monitoring

## Observability
The system includes basic observability practices to improve debugging and system insight:

- Structured logging in the backend (request lifecycle, errors, auth flow)
- Centralized logs via Docker containers
- HTTP request tracking for performance visibility
- Error tracing for API failures and third-party integrations (Spotify / Deezer)

This enables easier debugging of distributed components and mimics real-world production monitoring patterns.

## Tech stack
<img alt="JavaScript" height="30" src="https://img.shields.io/badge/JavaScript-00674F?style=for-the-badge&logo=javascript&logoColor=white" /> &nbsp;
<img alt="CSS" height="30" src="https://img.shields.io/badge/CSS-00674F?style=for-the-badge&logo=css&logoColor=white" /> &nbsp;
<img alt="React" height="30" src="https://img.shields.io/badge/React-00674F?style=for-the-badge&logo=react&logoColor=white" /> &nbsp;
<img alt="Node.js" height="30" src="https://img.shields.io/badge/Node.js-00674F?style=for-the-badge&logo=node.js&logoColor=white" /> &nbsp;
<img alt="Express" height="30" src="https://img.shields.io/badge/Express-00674F?style=for-the-badge&logo=express&logoColor=white" /> &nbsp;
<img alt="Docker" height="30" src="https://img.shields.io/badge/Docker-00674F?style=for-the-badge&logo=docker&logoColor=white" /> &nbsp;
<img alt="Redis" height="30" src="https://img.shields.io/badge/Redis-00674F?style=for-the-badge&logo=redis&logoColor=white" /> &nbsp;

## How to run locally

### ⚠️ Warning
Spotify API access may require a Premium Spotify account depending on endpoint restrictions and recent API changes (2026 update).

### Prerequisites:
- Docker + Docker Compose installed

### 1. Clone repository
```bash
git clone https://github.com/WendyDarli/starfy.git
cd starfy
```

### 2. Environment Variables

Rename .env.example to .env and fill in required values.

### 3. Run the full application
```docker compose up --build```

### 4. Access the app
http://localhost:5173
