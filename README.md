# Framewave Landing Page

A modern landing page for Framewave built with React, Vite, and Tailwind CSS.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Linting

This project uses ESLint to maintain code quality.

### Run Linting

```bash
npm run lint
```

### Auto-fix Linting Issues

```bash
npm run lint:fix
```

## Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to automatically lint code before commits.

When you commit changes:
1. Husky triggers the pre-commit hook
2. lint-staged runs ESLint on staged files
3. ESLint automatically fixes issues where possible
4. If there are unfixable errors, the commit is blocked

### Setup (Automatic)

Pre-commit hooks are automatically installed when you run `npm install` (via the `prepare` script).

### Manual Setup

If needed, you can manually set up the hooks:

```bash
npx husky install
```

## GitHub Actions

This project includes a GitHub Actions workflow that runs on pull requests and pushes to main/master branches.

The workflow:
1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Runs ESLint

Pull requests will be blocked if linting fails.

## Deployment

```bash
npm run deploy
```

This builds the project and deploys to GitHub Pages.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

