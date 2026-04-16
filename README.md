# starfy
*Live demo not available. Preview available on my portfolio.*

## About this project

This is a Spotify-inspired music player focused on scalable, maintainable architecture.

The goal was to understand how a production-level system is structured and how its components interact in a real-world full-stack application.

Instead of focusing on design novelty, the project breaks a complex product into smaller systems and rebuilds it to understand API design, backend structure, caching, and data flow.

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
- Authentication using tokens with Redis-based session storage and HTTP-only cookies
- State management with TanStack Query (server-state handling and request caching)
- Infinite pagination for search results


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
- Docker Installed.
- Node.JS Installed.
- A code editor (like VS Code)

### 1. Clone repository
```bash
git clone https://github.com/WendyDarli/starfy.git
cd starfy
```

### 2. Set up Infrastructure
This project uses Docker to run Redis in a consistent environment.

```bash
docker compose up -d
```

### 3. Environment Variables
Rename .env.example to .env and populate the fields using the inline comments as a reference.

### 4. Execution
To launch the application, run the following commands in your terminal:
```bash
# Launch Backend (Port 3000)
npm run startbackend

# Launch Frontend (Port 5173)
npm run startfrontend
```
Open [http://localhost:5173](http://localhost:5173) in your browser.



