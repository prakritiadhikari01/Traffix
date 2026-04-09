# Traffix Dashboard

A modern, responsive dashboard application built with React, TypeScript, Tailwind CSS, and Firebase.  
Easily monitor, analyze, and manage your data with a clean and intuitive interface.

## Features

- ⚡️ Fast and lightweight with [Vite](https://vitejs.dev/)
- 🎨 Styled using [Tailwind CSS](https://tailwindcss.com/)
- 🔥 Firebase integration for authentication, database, and hosting
- 🧩 Modular component architecture
- 🌙 Dark mode support
- ✅ Linting and formatting with ESLint and Prettier

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

```sh
# Install dependencies
npm install
# or
bun install
```

### Development

```sh
# Start the development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Building for Production

```sh
npm run build
```

### Linting

```sh
npm run lint
```

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Copy your Firebase config to `src/firebaseConfig.ts`.
3. Update `.firebaserc` and `firebase.json` as needed.

## Project Structure

```
src/
  components/    # Reusable UI components
  hooks/         # Custom React hooks
  lib/           # Library utilities
  pages/         # Page components
  services/      # API and service logic
  utils/         # Utility functions
public/          # Static assets and HTML
```

## Deployment

This project is configured for Firebase Hosting.  
See [`.github/workflows/`](.github/workflows/) for CI/CD setup.

To deploy manually:

```sh
npm run build
firebase deploy
```

## License

[MIT](LICENSE)

---

Made with ❤️ using React, TypeScript, Tailwind CSS, and Firebase.