**MEATEC Frontend Assignment**

A small React + TypeScript + Vite frontend project implementing a task management demo. It uses Tailwind CSS for styling, React Router for navigation, MSW (Mock Service Worker) for a local mock API, and a simple auth context to protect the dashboard route.

**Why this project is useful**

- **Local-first development:** MSW provides a realistic backend simulation so you can develop without a real API.
- **Modern stack:** React 19 + TypeScript + Vite + Tailwind for fast iteration and small build outputs.
- **Examples of common patterns:** Context-based auth, private/public routes, Axios HTTP client, and theme toggling.

**Quick links**

- Code: [src/App.tsx](src/App.tsx)
- Routing & bootstrap: [src/main.tsx](src/main.tsx)
- Mock API handlers: [src/mocks/handlers.ts](src/mocks/handlers.ts)
- Mock worker setup: [src/mocks/browser.ts](src/mocks/browser.ts)

**Getting started**

Prerequisites:

- Node.js 18+ (or current LTS)
- npm (or yarn / pnpm)

Clone and install dependencies:

```bash
git clone <repo-url>
cd MEATEC-frontend-assignment
npm install
```

Run the development server (MSW starts automatically in dev):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

**How to use the app (brief)**

- Open `http://localhost:5173` (Vite default) when running `npm run dev`.
- The root route is a login page; valid demo credentials are username : `test` and password : `test123` (assignment mentioned that we can predefine a user).
- After logging in you are redirected to `/dashboard` where you can create, toggle, and delete tasks.

**How the mock API works**

- The project uses MSW (Mock Service Worker). The worker is configured in [src/mocks/browser.ts](src/mocks/browser.ts) and started automatically from [src/main.tsx](src/main.tsx) when `import.meta.env.DEV` is true.
- Request handlers live in [src/mocks/handlers.ts](src/mocks/handlers.ts). They intercept `POST /api/login`, `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, and `DELETE /api/tasks/:id`.
- Handlers persist a simple in-browser datastore using `localStorage`, so data survives page reloads during development.
- The production build does not start the MSW worker; the mock is only active in development.

**Project structure (high level)**

- `src/` – application source
  - `components/` – `AuthContext`, `Login`, `PrivateRoute`, `PublicRoute`
  - `mocks/` – `browser.ts`, `handlers.ts` (MSW setup)
  - `hooks/` – `useTheme.tsx`
  - `App.tsx` – dashboard and task UI
  - `main.tsx` – router and bootstrapping

**Useful commands**

- `npm run dev` — start dev server (MSW enabled)
- `npm run build` — build production output
- `npm run preview` — preview built output
- `npm run lint` — run ESLint

**Where to look next**

- Authentication and route protection: [src/components/AuthContext.tsx](src/components/AuthContext.tsx)
- Mock handlers: [src/mocks/handlers.ts](src/mocks/handlers.ts)
- App behavior and task interactions: [src/App.tsx](src/App.tsx)
