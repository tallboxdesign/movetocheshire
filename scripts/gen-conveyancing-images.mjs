import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', 'buying-guide');

const flowchartHTML = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 720px; background: #FFFFFF; font-family: Inter, -apple-system, sans-serif; padding: 32px; }
.stages { display: flex; flex-direction: column; gap: 0; }
.row { display: flex; align-items: center; gap: 16px; }
.stage-box { flex: 1; background: #F9F7F4; border: 1px solid #E5E0D8; border-left: 4px solid #3D5A3E; padding: 14px 18px; }
.stage-num { font-size: 11px; font-weight: 700; color: #3D5A3E; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; }
.stage-name { font-size: 15px; font-weight: 700; color: #1C1C1E; }
.stage-dur { font-size: 12px; color: #999; margin-top: 2px; }
.callout { width: 220px; flex-shrink: 0; background: rgba(196,147,63,0.08); border: 1px solid rgba(196,147,63,0.3); border-left: 3px solid #C4933F; padding: 10px 14px; font-size: 12px; color: #1C1C1E; line-height: 1.4; }
.callout-label { font-weight: 700; color: #C4933F; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px; }
.arrow { display: flex; justify-content: center; padding: 4px 0; }
.arrow svg { width: 20px; height: 20px; }
.empty { width: 220px; flex-shrink: 0; }
</style></head><body>
<div class="stages">
  <div class="row">
    <div class="stage-box"><div class="stage-num">Stage 1</div><div class="stage-name">Instruct solicitor</div><div class="stage-dur">1-3 days</div></div>
    <div class="empty"></div>
  </div>
  <div class="arrow"><svg viewBox="0 0 20 20"><path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="#3D5A3E" stroke-width="2" fill="none"/></svg></div>
  <div class="row">
    <div class="stage-box"><div class="stage-num">Stage 2</div><div class="stage-name">Searches and contract pack</div><div class="stage-dur">2-4 weeks</div></div>
    <div class="callout"><div class="callout-label">Cheshire-specific</div>Salt search required (£79, 1 day). LA search: 5 days (Warrington) to 21 days (Cheshire East)</div>
  </div>
  <div class="arrow"><svg viewBox="0 0 20 20"><path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="#3D5A3E" stroke-width="2" fill="none"/></svg></div>
  <div class="row">
    <div class="stage-box"><div class="stage-num">Stage 3</div><div class="stage-name">Enquiries and mortgage</div><div class="stage-dur">2-6 weeks</div></div>
    <div class="callout"><div class="callout-label">Cheshire-specific</div>Chester conservation area enquiries add 1-2 weeks and £100-£200</div>
  </div>
  <div class="arrow"><svg viewBox="0 0 20 20"><path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="#3D5A3E" stroke-width="2" fill="none"/></svg></div>
  <div class="row">
    <div class="stage-box"><div class="stage-num">Stage 4</div><div class="stage-name">Exchange contracts</div><div class="stage-dur">1-2 days</div></div>
    <div class="empty"></div>
  </div>
  <div class="arrow"><svg viewBox="0 0 20 20"><path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="#3D5A3E" stroke-width="2" fill="none"/></svg></div>
  <div class="row">
    <div class="stage-box"><div class="stage-num">Stage 5</div><div class="stage-name">Completion</div><div class="stage-dur">1-4 weeks after exchange</div></div>
    <div class="empty"></div>
  </div>
  <div class="arrow"><svg viewBox="0 0 20 20"><path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="#3D5A3E" stroke-width="2" fill="none"/></svg></div>
  <div class="row">
    <div class="stage-box"><div class="stage-num">Stage 6</div><div class="stage-name">Land Registry registration</div><div class="stage-dur">4-12 weeks</div></div>
    <div class="callout"><div class="callout-label">Post-completion</div>SDLT return filed within 14 days. Land Registry processes freehold in 4-6 weeks</div>
  </div>
</div>
<p style="font-size: 11px; color: #999; margin-top: 16px;">Source: Law Society conveyancing protocol, 2025. Timelines are estimates and vary by transaction complexity.</p>
</body></html>`;

const barChartHTML = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 720px; background: #FFFFFF; font-family: Inter, -apple-system, sans-serif; padding: 32px; }
h2 { font-family: Georgia, serif; font-size: 20px; font-weight: 700; color: #1C1C1E; margin-bottom: 4px; }
.subtitle { font-size: 13px; color: #999; margin-bottom: 24px; }
.bar-row { display: flex; align-items: center; margin-bottom: 12px; }
.label { width: 220px; font-size: 14px; font-weight: 600; color: #1C1C1E; flex-shrink: 0; }
.bar-container { flex: 1; position: relative; height: 40px; background: #F9F7F4; border: 1px solid #E5E0D8; }
.bar { height: 100%; display: flex; align-items: center; justify-content: flex-end; padding-right: 12px; font-size: 13px; font-weight: 700; color: #FFFFFF; }
.bar-warrington { width: 23.8%; background: #3D5A3E; }
.bar-cwac { width: 95.2%; background: #C4933F; }
.bar-ce { width: 100%; background: #B8862D; }
.source { font-size: 11px; color: #999; margin-top: 20px; }
.scale { position: relative; height: 16px; font-size: 11px; color: #999; margin-bottom: 8px; margin-left: 220px; }
.scale span { position: absolute; transform: translateX(-50%); }
.s0 { left: 0; } .s5 { left: 23.8%; } .s10 { left: 47.6%; } .s15 { left: 71.4%; } .s21 { left: 100%; }
</style></head><body>
<h2>Local Authority Search Times in Cheshire</h2>
<p class="subtitle">Working days to process LLC1 and CON29 searches</p>
<div class="scale"><span class="s0">0</span><span class="s5">5</span><span class="s10">10</span><span class="s15">15</span><span class="s21">21</span></div>
<div class="bar-row">
  <div class="label">Warrington</div>
  <div class="bar-container"><div class="bar bar-warrington">5 days</div></div>
</div>
<div class="bar-row">
  <div class="label">Cheshire West and Chester</div>
  <div class="bar-container"><div class="bar bar-cwac">20 days</div></div>
</div>
<div class="bar-row">
  <div class="label">Cheshire East</div>
  <div class="bar-container"><div class="bar bar-ce">21 days</div></div>
</div>
<p class="source">Source: Local authority published turnaround times, February 2026. Times vary by workload and peak periods.</p>
</body></html>`;

import fs from 'fs';
const bgImagePath2 = path.join(__dirname, '..', 'nanobanana-output', 'soft_blurred_aerial_photograph_o.png');
const bgBase64 = fs.readFileSync(bgImagePath2).toString('base64');
const bgImageUrl = `data:image/png;base64,${bgBase64}`;

const compositeFlowchartHTML = `<!DOCTYPE html>
<html><head><style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 720px; height: 480px; font-family: Inter, -apple-system, sans-serif; position: relative; overflow: hidden; }
.bg { position: absolute; inset: 0; background: url('${bgImageUrl}') center/cover; filter: brightness(0.3) blur(2px); }
.overlay { position: relative; z-index: 1; padding: 28px 32px; height: 100%; display: flex; flex-direction: column; }
h2 { font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px; }
.subtitle { font-size: 12px; color: rgba(255,255,255,0.7); margin-bottom: 20px; }
.timeline { display: flex; align-items: flex-start; gap: 0; flex: 1; }
.stage { flex: 1; text-align: center; position: relative; }
.stage-dot { width: 32px; height: 32px; border-radius: 50%; background: #3D5A3E; color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; border: 2px solid rgba(255,255,255,0.3); }
.stage-name { font-size: 11px; font-weight: 700; color: #FFFFFF; line-height: 1.3; margin-bottom: 3px; }
.stage-dur { font-size: 10px; color: rgba(255,255,255,0.7); }
.connector { position: absolute; top: 16px; left: 50%; width: 100%; height: 2px; background: rgba(255,255,255,0.25); z-index: -1; }
.stage:last-child .connector { display: none; }
.callout { background: rgba(196,147,63,0.15); border: 1px solid rgba(196,147,63,0.5); border-left: 3px solid #C4933F; padding: 8px 12px; font-size: 10px; color: #FFFFFF; line-height: 1.35; margin-top: 8px; text-align: left; }
.callout-label { font-weight: 700; color: #C4933F; font-size: 9px; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px; }
.source { font-size: 9px; color: rgba(255,255,255,0.5); margin-top: auto; padding-top: 12px; }
.totals { display: flex; gap: 24px; margin-top: 16px; }
.total-box { background: rgba(61,90,62,0.3); border: 1px solid rgba(61,90,62,0.6); padding: 8px 14px; }
.total-label { font-size: 9px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px; }
.total-value { font-size: 16px; font-weight: 700; color: #FFFFFF; }
</style></head><body>
<div class="bg"></div>
<div class="overlay">
  <h2>Cheshire Conveyancing Timeline</h2>
  <p class="subtitle">Six stages from instruction to registration</p>
  <div class="timeline">
    <div class="stage"><div class="connector"></div><div class="stage-dot">1</div><div class="stage-name">Instruct solicitor</div><div class="stage-dur">1-3 days</div></div>
    <div class="stage"><div class="connector"></div><div class="stage-dot">2</div><div class="stage-name">Searches and contract pack</div><div class="stage-dur">2-4 weeks</div><div class="callout"><div class="callout-label">Cheshire</div>Salt search £79. LA search: 5-21 days</div></div>
    <div class="stage"><div class="connector"></div><div class="stage-dot">3</div><div class="stage-name">Enquiries and mortgage</div><div class="stage-dur">2-6 weeks</div><div class="callout"><div class="callout-label">Chester</div>Conservation area adds 1-2 weeks</div></div>
    <div class="stage"><div class="connector"></div><div class="stage-dot">4</div><div class="stage-name">Exchange contracts</div><div class="stage-dur">1-2 days</div></div>
    <div class="stage"><div class="connector"></div><div class="stage-dot">5</div><div class="stage-name">Completion</div><div class="stage-dur">1-4 weeks</div></div>
    <div class="stage"><div class="stage-dot">6</div><div class="stage-name">Land Registry</div><div class="stage-dur">4-12 weeks</div></div>
  </div>
  <div class="totals">
    <div class="total-box"><div class="total-label">Standard timeline</div><div class="total-value">8-12 weeks</div></div>
    <div class="total-box"><div class="total-label">Total cost (excl. SDLT)</div><div class="total-value">£750-£1,600</div></div>
  </div>
  <p class="source">Source: Law Society conveyancing protocol, 2025. Timelines are estimates.</p>
</div>
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

await render(flowchartHTML, 'cheshire-conveyancing-process-flowchart.png');
await render(barChartHTML, 'cheshire-la-search-timeline-comparison.png');
await render(compositeFlowchartHTML, 'cheshire-conveyancing-timeline-composite.png');
