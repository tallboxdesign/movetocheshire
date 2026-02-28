import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'buying-guide');

const dynamicsHTML = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 720px; background: #FAF9F7; font-family: Inter, -apple-system, sans-serif; padding: 32px; }
h2 { font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #1C1C1E; margin-bottom: 4px; }
.subtitle { font-size: 13px; color: #999; margin-bottom: 28px; }
.tiers { display: flex; gap: 16px; }
.tier { flex: 1; border: 1px solid #E5E0D8; background: #FFFFFF; padding: 20px; position: relative; }
.tier-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 3px solid currentColor; }
.tier-gold .tier-label { color: #C4933F; border-color: #C4933F; }
.tier-green .tier-label { color: #3D5A3E; border-color: #3D5A3E; }
.tier-gray .tier-label { color: #444444; border-color: #444444; }
.tier-areas { font-size: 12px; color: #999; margin-bottom: 16px; line-height: 1.4; }
.metric { margin-bottom: 14px; }
.metric-label { font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 2px; }
.metric-value { font-size: 22px; font-weight: 700; color: #1C1C1E; }
.metric-sm { font-size: 15px; font-weight: 700; color: #1C1C1E; }
.competition { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 3px; }
.comp-high { background: rgba(196,147,63,0.12); color: #C4933F; }
.comp-med { background: rgba(61,90,62,0.1); color: #3D5A3E; }
.comp-low { background: rgba(68,68,68,0.1); color: #444444; }
.source { font-size: 11px; color: #999; margin-top: 20px; }
</style></head><body>
<h2>Cheshire Offer Dynamics by Market Tier</h2>
<p class="subtitle">How location affects your negotiation range across Cheshire</p>
<div class="tiers">
  <div class="tier tier-gold">
    <div class="tier-label">Golden Triangle</div>
    <div class="tier-areas">Wilmslow, Knutsford, Alderley Edge</div>
    <div class="metric"><div class="metric-label">Avg price</div><div class="metric-value">£577k</div></div>
    <div class="metric"><div class="metric-label">Typical offer range</div><div class="metric-sm">95-102% of asking</div></div>
    <div class="metric"><div class="metric-label">Competition</div><div><span class="competition comp-high">High</span></div></div>
  </div>
  <div class="tier tier-green">
    <div class="tier-label">Mid-Cheshire</div>
    <div class="tier-areas">Chester, Macclesfield, Frodsham</div>
    <div class="metric"><div class="metric-label">Avg price</div><div class="metric-value">£315k</div></div>
    <div class="metric"><div class="metric-label">Typical offer range</div><div class="metric-sm">92-97% of asking</div></div>
    <div class="metric"><div class="metric-label">Competition</div><div><span class="competition comp-med">Medium</span></div></div>
  </div>
  <div class="tier tier-gray">
    <div class="tier-label">Affordable Cheshire</div>
    <div class="tier-areas">Crewe, Northwich, Warrington</div>
    <div class="metric"><div class="metric-label">Avg price</div><div class="metric-value">£190k</div></div>
    <div class="metric"><div class="metric-label">Typical offer range</div><div class="metric-sm">88-95% of asking</div></div>
    <div class="metric"><div class="metric-label">Competition</div><div><span class="competition comp-low">Low-Medium</span></div></div>
  </div>
</div>
<p class="source">Sources: ONS House Price Index Q4 2025, Rightmove sold prices 2025, NAEA Propertymark regional data.</p>
</body></html>`;

const flowchartHTML = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 720px; background: #FAF9F7; font-family: Inter, -apple-system, sans-serif; padding: 32px; }
h2 { font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #1C1C1E; margin-bottom: 4px; }
.subtitle { font-size: 13px; color: #999; margin-bottom: 24px; }
.flow { display: flex; align-items: flex-start; gap: 0; }
.step { flex: 1; text-align: center; position: relative; }
.step-num { width: 28px; height: 28px; border-radius: 50%; background: #3D5A3E; color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; }
.step-name { font-size: 12px; font-weight: 700; color: #1C1C1E; line-height: 1.3; margin-bottom: 4px; min-height: 32px; display: flex; align-items: center; justify-content: center; padding: 0 4px; }
.step-dur { font-size: 10px; color: #999; }
.connector { position: absolute; top: 14px; left: 50%; width: 100%; height: 2px; background: #E5E0D8; z-index: 0; }
.step:last-child .connector { display: none; }
.step-num { position: relative; z-index: 1; }
.step-accepted .step-num { background: #C4933F; }
.source { font-size: 11px; color: #999; margin-top: 24px; }
.total { margin-top: 16px; display: inline-block; background: rgba(61,90,62,0.08); border: 1px solid rgba(61,90,62,0.2); padding: 8px 16px; font-size: 13px; color: #1C1C1E; }
.total strong { color: #3D5A3E; }
</style></head><body>
<h2>Cheshire Offer Process - From Preparation to SSTC</h2>
<p class="subtitle">Six steps from preparing your offer to protecting your position</p>
<div class="flow">
  <div class="step"><div class="connector"></div><div class="step-num">1</div><div class="step-name">Prepare to offer</div><div class="step-dur">1-3 days</div></div>
  <div class="step"><div class="connector"></div><div class="step-num">2</div><div class="step-name">View and research</div><div class="step-dur">1-7 days</div></div>
  <div class="step"><div class="connector"></div><div class="step-num">3</div><div class="step-name">Make your offer</div><div class="step-dur">Same day</div></div>
  <div class="step"><div class="connector"></div><div class="step-num">4</div><div class="step-name">Negotiate</div><div class="step-dur">1-5 days</div></div>
  <div class="step step-accepted"><div class="connector"></div><div class="step-num">5</div><div class="step-name">Offer accepted (SSTC)</div><div class="step-dur">Milestone</div></div>
  <div class="step"><div class="step-num">6</div><div class="step-name">Protect your position</div><div class="step-dur">Ongoing</div></div>
</div>
<div class="total">Typical Cheshire offer-to-SSTC timeline: <strong>2-4 weeks</strong></div>
<p class="source">Timelines vary by area and competition level. Golden Triangle sealed bids may compress steps 3-5 into a single deadline.</p>
</body></html>`;

async function render(html, filename) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 720, height: 800 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const body = await page.$('body');
  const box = await body.boundingBox();
  await page.screenshot({
    path: path.join(outDir, filename),
    clip: { x: 0, y: 0, width: box.width, height: box.height },
  });
  await browser.close();
  console.log(`Saved: ${filename} (${Math.round(box.width)}x${Math.round(box.height)})`);
}

import { execSync } from 'child_process';

await render(dynamicsHTML, 'cheshire-offer-dynamics-comparison.png');
await render(flowchartHTML, 'cheshire-offer-process-flowchart.png');

// Convert to WebP
for (const name of ['cheshire-offer-dynamics-comparison', 'cheshire-offer-process-flowchart']) {
  const png = path.join(outDir, `${name}.png`);
  const webp = path.join(outDir, `${name}.webp`);
  execSync(`cwebp -q 85 "${png}" -o "${webp}"`);
  console.log(`Converted: ${name}.webp`);
}
