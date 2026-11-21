import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

test('every anchor points to an existing section or an external website', () => {
  for (const [, target] of html.matchAll(/href="#([a-z0-9-]+)"/g)) {
    assert.match(html, new RegExp(`id="${target}"`), `missing #${target}`);
  }
});
test('all local assets exist', () => {
  for (const [, file] of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) {
    assert.ok(existsSync(new URL(`../${file}`, import.meta.url)), `missing ${file}`);
  }
  assert.ok(existsSync(new URL('../assets/night-drive.jpg', import.meta.url)));
});
test('prelaunch site has no fake conversion or availability promises', () => {
  assert.match(html, /Service is not available yet/);
  assert.match(html, /No download link or sign-up is available/);
  assert.doesNotMatch(html, /<form\b|24\/7|Get it on Google Play|Download on the App Store/i);
  assert.match(html, /is AID an emergency service[\s\S]*?<p>No\./i);
});
test('service selector has a panel and keyboard operation', () => {
  assert.equal((html.match(/class="service-tab(?: active)?"/g) || []).length, 5);
  assert.match(html, /role="tabpanel"/);
  assert.match(js, /ArrowRight/);
  assert.match(js, /aria-selected/);
});
test('the app preview uses genuine captured assets and labels test data', () => {
  assert.match(html, /assets\/screens\/home\.jpg/);
  assert.match(html, /TEST DATA/);
  assert.match(html, /test data, not a live customer or service commitment/i);
  assert.equal((html.match(/id="experience-tab-[0-2]"/g) || []).length, 3);
  assert.match(js, /ArrowRight/);
  assert.match(js, /prefers-reduced-motion: reduce/);
  for (const file of ['home', 'request', 'tracking']) {
    assert.ok(existsSync(new URL(`../assets/screens/${file}.jpg`, import.meta.url)));
  }
});
test('mobile and reduced-motion styles are present', () => {
  assert.match(css, /max-width:760px/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
