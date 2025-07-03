const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const http = require('http');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

const SERVE_PORT = 3000;

expect.extend({ toMatchImageSnapshot });

function waitForServer(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    (function check() {
      http.get(url, res => {
        if (res.statusCode === 200) resolve();
        else if (Date.now() - start > timeout) reject(new Error('Timeout waiting for server'));
        else setTimeout(check, 250);
      }).on('error', () => {
        if (Date.now() - start > timeout) reject(new Error('Timeout waiting for server'));
        else setTimeout(check, 250);
      });
    })();
  });
}

describe('Homepage', () => {
  let server;

  beforeAll(async () => {
    // Build the site
    await new Promise((resolve, reject) => {
      const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
      build.on('close', code => code === 0 ? resolve() : reject(new Error('Build failed')));
    });
    // Serve the site
    server = spawn('npx', ['serve', 'public', '-l', String(SERVE_PORT)], { stdio: 'inherit' });
    await waitForServer(`http://localhost:${SERVE_PORT}`);
  }, 30000);

  afterAll(async () => {
    if (server) {
      console.log('Killing server process...');
      server.kill('SIGKILL');
      await new Promise(resolve => server.on('exit', resolve));
      console.log('Server process exited.');
    }
  });

  // Ensure all browsers are closed even on error
  function safeBrowser(fn) {
    return async (...args) => {
      let browser;
      try {
        browser = await puppeteer.launch();
        return await fn(browser, ...args);
      } catch (err) {
        console.error('Error in browser test:', err);
        throw err;
      } finally {
        if (browser) {
          await browser.close();
          console.log('Browser closed.');
        }
      }
    };
  }

  // Update tests to use safeBrowser
  it('should not have any 404s on the homepage', safeBrowser(async (browser) => {
    const page = await browser.newPage();
    const responses = [];
    page.on('response', response => responses.push(response));
    await page.goto(`http://localhost:${SERVE_PORT}`, { waitUntil: 'networkidle2' });
    const notFound = responses.filter(res => res.status() === 404).map(res => res.url());
    expect(notFound).toEqual([]);
  }), 20000);

  it('should not have any broken links on the homepage', safeBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${SERVE_PORT}`, { waitUntil: 'networkidle2' });
    const links = await page.$$eval('a[href]', as => as.map(a => a.href));
    const uniqueLinks = Array.from(new Set(links)).filter(href => href.startsWith('http://localhost'));
    const brokenLinks = [];
    for (const link of uniqueLinks) {
      try {
        const res = await page.goto(link, { waitUntil: 'domcontentloaded' });
        if (res.status() === 404) brokenLinks.push(link);
      } catch (e) {
        brokenLinks.push(link);
      }
    }
    expect(brokenLinks).toEqual([]);
  }), 30000);

  it('homepage screenshot should match the snapshot', safeBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`http://localhost:${SERVE_PORT}`, { waitUntil: 'networkidle2' });
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot).toMatchImageSnapshot({
      customSnapshotsDir: `${__dirname}/__image_snapshots__`,
      customDiffDir: `${__dirname}/__image_snapshots__/__diff_output__`,
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  }), 20000);
});
