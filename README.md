<div align="center">

# BookTrack

**Your private reading library** — browse books, keep shelves tidy, and jot down notes as you read.

[![Live Demo](https://img.shields.io/badge/demo-GitHub%20Pages-222?style=flat-square)](https://nadiaturko.github.io/booktrack/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live demo](https://nadiaturko.github.io/booktrack/) · [Report bug](https://github.com/NadiaTurko/booktrack/issues) · [Request feature](https://github.com/NadiaTurko/booktrack/issues)

<br />

<img src="src/assets/screenshots/home.png" alt="BookTrack library overview" width="900" />

</div>

---

## About

BookTrack is a React web app for organizing a personal reading list. Search books from [Open Library](https://openlibrary.org/), save favorites, track **To Read** / **Finished** shelves, switch between view modes, and keep reading notes & quotes on each book’s details page.

Data for shelves and journal entries is stored per user in `localStorage`; authentication is handled by Firebase.

---

## Features

- Browse and search books via the Open Library API
- Favorites with **To Read** and **Finished** shelf status
- Multiple view modes: Books, Cards, Library, List
- Sort & filter on the library and favorites pages
- Book details with description, shelf controls, and a reading journal (notes, quotes, place)
- Firebase email/password auth with protected routes
- Responsive cozy “reading library” UI (cream / burgundy)

---

## Screenshots

<p align="center">
  <img src="src/assets/screenshots/home.png" alt="Library home with shelves, filters, and book cards" width="48%" />
  &nbsp;
  <img src="src/assets/screenshots/login.png" alt="Login screen" width="48%" />
</p>

---

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19, TypeScript, React Router 7 |
| Styling | Tailwind CSS 4, Lucide icons |
| Auth | Firebase Authentication |
| Forms | Formik + Yup |
| Data | Open Library API, localStorage repositories |
| Architecture | Context API, shared hooks, repository interfaces |
| Tooling | Vite 7, ESLint, React Compiler, gh-pages |

---

## Getting started

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+

### Install & run

```bash
git clone https://github.com/NadiaTurko/booktrack.git
cd booktrack
npm install
npm run dev
```

Open the local URL printed by Vite (base path: `/booktrack/`).

### Demo account

On the login screen you can use **Sign in as demo user**, or:

| Field | Value |
| --- | --- |
| Email | `demo@demo.com` |
| Password | `demo1234` |

> The demo user must exist in the Firebase Auth project linked to this app.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Project structure

```text
src/
  components/     # Presentational UI (BookCard views, filters, layout)
  containers/     # Page orchestrators
  context/        # Auth, books, favorites, journal providers
  domain/         # Repository interfaces (DIP)
  hooks/          # Shared library & auth hooks
  repositories/   # localStorage implementations
  routes/         # App routes & protected route
  services/       # Firebase auth helpers
  types/          # Shared TypeScript types
```

---

## License

This project is available under the [ISC](https://opensource.org/licenses/ISC) license.
