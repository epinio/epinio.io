# Epinio.io website

This website is built using [Astro](https://astro.build/).

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   This will start a local server at `http://localhost:4321` and watch for changes.

3. Build the site for production (static output):

   ```bash
   npm run build
   ```

   This will generate the static site in the `dist` directory.

4. Preview the built static site locally:

   ```bash
   npm run preview
   ```

## Development

### Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)

### Developing

To develop locally, run the following command:

```bash
npm run dev
```

This starts a local dev server at `http://localhost:4321` with hot module reloading for changes in `src/`.

### Linting

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint:fix
```

### Building

To build the website for production, run:

```bash
npm run build
```

This generates the static files in the `dist` directory.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages automatically via [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml), using the official [`withastro/action`](https://github.com/withastro/action).
