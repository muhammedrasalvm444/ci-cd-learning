# Todo App

A simple Todo application built with **Next.js App Router**, **React**, **TypeScript**, and **Tailwind CSS**. Todos are stored in the browser with `localStorage` — no backend or database required.

## Features

- Add, edit, and delete todos
- Mark todos as completed or active
- Filter by All, Active, and Completed
- Persist todos in `localStorage`
- Form validation and empty states
- Responsive layout for desktop and mobile

## Project structure

```
src/
  app/              # Next.js App Router pages and global styles
  components/       # UI components (form, list, filters, etc.)
  hooks/            # Custom React hooks (useTodos)
  lib/              # Helpers (localStorage)
  types/            # Shared TypeScript types
```

## Prerequisites

- Node.js 18+ (recommended)
- npm

## Installation

```bash
cd todo-app
npm install
```

## Run locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Other scripts

```bash
# Production build
npm run build

# Start the production server (after build)
npm start

# Lint
npm run lint
```

## Notes

- Data is saved only in the current browser via `localStorage`.
- Clearing site data or using a different browser/device will not show the same todos.
- This project intentionally has no authentication, API, database, or deployment tooling.
