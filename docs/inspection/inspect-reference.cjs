/* Analysis tooling only. Reads rendered geometry; never reads source bundles or stylesheets. */
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH);
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.join(__dirname, 'evidence');

async function measure(page) {
  return page.evaluate(() => {
    const describe = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(), id: el.id, classes: typeof el.className === 'string' ? el.className : '',
        childCount: el.children.length, textLength: el.textContent.trim().length,
        rect: Object.fromEntries(['x', 'y', 'width', 'height'].map(k => [k, Math.round(r[k] * 100) / 100])),
        style: Object.fromEntries(['display', 'position', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform', 'textAlign', 'color', 'backgroundColor', 'padding', 'margin', 'gap', 'overflow', 'zIndex', 'transform', 'transformOrigin', 'opacity', 'clipPath', 'cursor', 'objectFit', 'borderRadius'].map(k => [k, s[k]])),
      };
    };
    const nodes = [...document.querySelectorAll('header, nav, main, section, footer, h1, h2, h3, button, a, canvas, video, img, [class*="cursor"], [class*="loader"], [class*="hero"], [class*="title"]')];
    return {url: location.href, viewport: {width: innerWidth, height: innerHeight}, scroll: {x: scrollX, y: scrollY, height: document.documentElement.scrollHeight, width: document.documentElement.scrollWidth}, body: describe(document.body), elements: nodes.slice(0, 140).map(describe)};
  });
}

async function main() {
  await fs.mkdir(output, {recursive: true});
  const browser = await chromium.launch({headless: true, executablePath: process.env.CHROMIUM_PATH});
  try {
    for (const [width, height] of [[1440,900],[1280,800],[768,1024],[390,844]]) {
      const context = await browser.newContext({viewport: {width,height}, deviceScaleFactor: 1, isMobile: width < 500, hasTouch: width < 800});
      const page = await context.newPage();
      const failures = [];
      page.on('pageerror', e => failures.push(e.message));
      page.on('requestfailed', r => failures.push(`${r.resourceType()}: ${r.failure()?.errorText}`));
      const started = Date.now();
      const response = await page.goto('https://milancompain.com/', {waitUntil: 'domcontentloaded', timeout: 60000});
      const snapshots = [];
      for (const target of [0, 500, 1000, 2000, 4000, 7000]) {
        await page.waitForTimeout(Math.max(0, target - (Date.now() - started)));
        const name = `${width}x${height}-load-${target}`;
        await page.screenshot({path:path.join(output, `${name}.png`)});
        snapshots.push({name, elapsedMs:Date.now()-started, measurement:await measure(page)});
      }
      await page.screenshot({path:path.join(output, `${width}x${height}-full.png`), fullPage:true});
      await fs.writeFile(path.join(output, `${width}x${height}-initial.json`), JSON.stringify({status:response.status(), failures, snapshots}, null, 2));
      console.log(JSON.stringify({viewport:`${width}x${height}`,status:response.status(),elapsedMs:Date.now()-started,failures}));
      await context.close();
    }
  } finally { await browser.close(); }
}
module.exports = {measure};
if (require.main === module) main().catch(e => {console.error(e);process.exitCode=1;});
