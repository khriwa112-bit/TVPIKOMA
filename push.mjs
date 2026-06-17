import fs from 'fs';
import path from 'path';

const TOKEN = process.env.GITHUB_TOKEN || '';
const REPO = 'imranelmokhtari322-dev/http-localhost-3004-';
const BASE = '/Users/macbookpro/Downloads/swivtv green and white';

const IGNORE = ['node_modules', '.git', 'dist', '.DS_Store', 'push.mjs'];
const IGNORE_EXT = ['.woff', '.woff2', '.ttf', '.eot'];

async function api(endpoint, method = 'GET', body = null) {
  const res = await fetch(`https://api.github.com${endpoint}`, {
    method,
    headers: {
      Authorization: `token ${TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: body ? JSON.stringify(body) : null,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${json.message}`);
  return json;
}

function getFiles(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (IGNORE.some(i => rel === i || rel.startsWith(i + '/'))) continue;
    if (e.isDirectory()) {
      files = files.concat(getFiles(full, base));
    } else {
      if (IGNORE_EXT.includes(path.extname(e.name).toLowerCase())) continue;
      files.push(rel);
    }
  }
  return files;
}

const IMG_EXT = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg'];

function getImageFiles(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(base, full);
    if (IGNORE.some(i => rel === i || rel.startsWith(i + '/'))) continue;
    if (e.isDirectory()) {
      files = files.concat(getImageFiles(full, base));
    } else {
      if (IMG_EXT.includes(path.extname(e.name).toLowerCase())) files.push(rel);
    }
  }
  return files;
}

async function main() {
  const files = getImageFiles(BASE);
  console.log(`Uploading ${files.length} image files...`);

  for (const file of files) {
    const content = fs.readFileSync(path.join(BASE, file)).toString('base64');
    try {
      let sha;
      try {
        const existing = await api(`/repos/${REPO}/contents/${file}`);
        sha = existing.sha;
      } catch {}
      await api(`/repos/${REPO}/contents/${file}`, 'PUT', {
        message: `Update ${file}`,
        content,
        branch: 'main',
        ...(sha ? { sha } : {}),
      });
      console.log(`  ✓ ${file}`);
    } catch (e) {
      console.error(`  ✗ ${file}: ${e.message}`);
    }
  }

  console.log(`\n✓ Done! Visit: https://github.com/${REPO}`);
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
