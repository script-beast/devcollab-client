# DevCollab Frontend

![React](https://img.shields.io/badge/React-19-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Apollo Client](https://img.shields.io/badge/Apollo_Client-4-311C87?logo=apollographql)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui)

DevCollab Frontend is a React + TypeScript engineering workspace UI for managing projects, issues, labels, team roles, and delivery insights through a GraphQL API.

## Live Demo

`LIVE_URL_HERE`

## Backend Repository

`GITHUB_URL_HERE`

## Features

- Landing page with modular sections (hero, features, tech stack, product preview, developer profile)
- Authentication (login/register) with JWT session persistence via localStorage
- Seeded account picker in login flow for quick demo access
- Protected route shell with auth guards and public-route redirects
- Projects dashboard with search, status filters, progress, and create/update actions
- Project details workspace with issue list, issue filters, issue drawer, and comment trail
- Team management drawer with role updates, add/remove member actions, and available-user lookup
- Workspace board view grouped by issue status (read-only view)
- Labels management module with create/update/delete and usage analytics
- Insights dashboard with charts (status distribution, project progress, 7-day activity)
- Centralized Apollo client with auth header injection and auth-aware error redirects

## Route Map

| Route | Access | Screen |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public-only (redirects if authenticated) | Sign in |
| `/register` | Public-only (redirects if authenticated) | Sign up |
| `/projects` | Auth required | Projects dashboard |
| `/projects/:projectId` | Auth required | Project details |
| `/board` | Auth required | Workspace board (view-only) |
| `/labels` | Auth required | Labels manager |
| `/insights` | Auth required | Analytics dashboard |
| `*` | Public | Not found |

## Tech Stack

| Area | Tools |
|---|---|
| Framework | React 19, React Router 7 |
| Language | TypeScript |
| Build Tooling | Vite 8, ESLint 9 |
| UI | Material UI 7, Emotion, React Icons |
| Data Layer | Apollo Client 4, GraphQL |
| Visualization | Recharts |
| Utility | Day.js, React Toastify |

## Folder Structure

```text
devcollab-client/
|- public/
|- src/
|  |- api/
|  |  |- apolloClient.ts
|  |- components/
|  |  |- auth/
|  |  |- common/
|  |  |- issue/
|  |  |- label/
|  |  |- landing/
|  |  |- project/
|  |- contexts/
|  |  |- AuthContext.tsx
|  |- data/
|  |  |- mockIssues.ts
|  |  |- mockLabels.ts
|  |  |- mockProjectMembers.ts
|  |  |- mockProjects.ts
|  |- graphql/
|  |- helper/
|  |- layouts/
|  |- pages/
|  |- screen/
|  |- theme/
|  |- types/
|  |- App.tsx
|  |- main.tsx
|- eslint.config.js
|- package.json
|- vite.config.ts
```

## Installation

```bash
npm install
npm run dev
```

### Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start dev server |
| `build` | `tsc -b && vite build` | Type-check + production build |
| `lint` | `eslint .` | Lint project files |
| `preview` | `vite preview` | Preview built app |

## Environment Variables

No frontend environment variables are currently required by the implementation.

Notes:
- GraphQL endpoint is currently hardcoded in `src/api/apolloClient.ts` as `http://localhost:5000/graphql`.
- Auth keys stored in browser localStorage:
  - `devC-token`
  - `devC-user`