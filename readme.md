# Epinio.io website

This website is built using [Hugo](https://gohugo.io/) and the Hugo Material theme.

## Quick Start (Node.js)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run serve
   ```

   This will start a local server at `http://localhost:1313` and watch for changes.


3. Build the site for production (minified static files):

   ```bash
   npm run build
   ```

   This will generate a minified static site in the `public` directory.

4. Serve the built static site locally:

   ```bash
   npm run build:serve
   ```

   This will serve the contents of the `public` directory at `http://localhost:3000` (default port).

## Development

### Prerequisites

- Install [Hugo](https://gohugo.io/getting-started/installing/)
- Install [Node.js](https://nodejs.org/en/download/) (for building the theme)

### Developing

To develop locally, run the following command:

```bash
hugo server
```

This will start a local server at `http://localhost:1313` and watch for changes in the content and theme files.

### Building

To build the website for production, run the following command:

```bash
hugo
```

This will generate the static files in the `public` directory.
You can then commit the contents of the `public` directory.