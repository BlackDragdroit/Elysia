# Elysia

Elysia is a gamified to-do app. Tasks become **quests** with difficulties that
grant XP, bigger projects become **boss battles** broken into steps, and
progress unlocks levels, achievements and collectible items (XP potions,
profile icons, titles).

## Repository layout

- `LevelUp/` — the mobile app (Expo SDK 52, expo-router, JavaScript).
- `db/` — the optional self-hosted backend (Express 5 + Mongoose + JWT auth).
- `shared/gameRules.js` — the game rules (XP, levels, loot, achievements) shared
  verbatim by the app and the server so both modes behave identically.
- `docker-compose.yml` — one-command self-hosted backend (MongoDB + API).

## Running the app

```bash
cd LevelUp
npm install
npx expo start
```

Then open it in Expo Go (or an emulator). No native build and no backend are
required.

### Local vs. server mode

The app works fully offline out of the box: all data lives on the device in
AsyncStorage (**local mode**). On first launch it asks for a display name and
you're in.

In **Profile → Settings → Data Mode** you can switch to **server mode** by
entering the URL of a self-hosted backend and registering/logging in. Server
mode authenticates with username + password (JWT). Data is *not* migrated when
switching between local and server mode — each mode has its own profile.

> Note: the Android release build allows plain `http://` to a self-hosted
> server on your LAN (`usesCleartextTraffic` is enabled via
> `expo-build-properties`), so no HTTPS setup is needed.

## Self-hosting the server

### With Docker (recommended)

```bash
JWT_SECRET="a-long-random-string" docker compose up --build
```

This starts MongoDB and the API on port `3001`.

### Without Docker

You need a running MongoDB (local install, Docker, or Atlas).

```bash
cd db
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm start              # listens on PORT (default 3001)
```

`JWT_SECRET` is required; the server refuses to start without it.

The API exposes `GET /api/health`, `POST /api/auth/register`,
`POST /api/auth/login`, and authenticated routes for profile, quests, bosses,
achievements and inventory. All game logic lives in `shared/gameRules.js`.

## Tests

```bash
node --test shared/        # game rules unit tests
cd db && npm test          # API tests (supertest + in-memory MongoDB)
cd LevelUp && npx jest --ci  # local store tests
```
