/* Production-browser verification. Uses an existing Playwright Core installation. */
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH);
const fs = require('node:fs/promises');
const path = require('node:path');
const out = path.join(__dirname, 'screenshots');
const origin = process.env.SITE_ORIGIN || 'http://127.0.0.1:4173';
const sizes = process.argv.includes('--quick') ? [[1440,900],[390,844]] : [[1920,1080],[1440,900],[1280,800],[1024,768],[768,1024],[430,932],[390,844],[375,812]];

async function geometry(page) {
  return page.evaluate(() => {
    const visible = element => element.checkVisibility({ opacityProperty:true, visibilityProperty:true });
    const selectors=['.hero-title-line h1','.hero-descriptor','.hero-tagline','.floating-word','.system-panel','.system-caption h3','.system-description','.contact-address','.site-footer'];
    const elements=[...document.querySelectorAll(selectors.join(','))].filter(visible).map(el=>{const r=el.getBoundingClientRect();return {selector:el.className||el.tagName,rect:[r.x,r.y,r.width,r.height],font:getComputedStyle(el).fontSize};});
    return {scroll:scrollY,scene:document.querySelector('.experience').dataset.sceneH,width:innerWidth,height:innerHeight,documentWidth:document.documentElement.scrollWidth,active:document.querySelector('[aria-current="location"]')?.getAttribute('href'),elements};
  });
}

(async()=>{
 await fs.mkdir(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 const results=[];
 try{
  for(const [width,height] of sizes){
   const touch=width<=768;
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:width<500,hasTouch:touch,permissions:['clipboard-read','clipboard-write']});
   const page=await ctx.newPage();const errors=[],requests=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
   page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);if(r.url().startsWith(origin))requests.push({url:r.url(),status:r.status()});});
   await page.goto(origin,{waitUntil:'networkidle'});await page.waitForTimeout(4500);
   const snapshots=[];
   const capture=async name=>{await page.screenshot({path:path.join(out,`${width}x${height}-${name}.png`)});snapshots.push({name,...await geometry(page)});};
   await capture('hero');
   const count=await page.locator('.system-panel').count();
   const pace=touch?1.8:1,about=1+2*pace+.1,aboutEnd=about+3.3*pace,bridge=aboutEnd+.65*pace,bridgeEnd=bridge+1.45*pace,heading=bridgeEnd+.55*pace,work=heading+.4,panelLength=1.75*pace,workEnd=work+count*panelLength,outro=workEnd+.7*pace,operations=outro+1.1*pace,fit=operations+1.65*pace,contact=fit+1.8*pace;
   const states=[['traversal',1.5*pace],['approach',about+1.5*pace],['workflow',bridge]];
   for(let i=0;i<count;i++)states.push([`system-${i+1}`,work+(i*panelLength)+.3*pace]);
   states.push(['operations',operations],['fit',fit],['contact',contact]);
   for(const [name,h] of states){
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),h*height);await page.waitForTimeout(1400);await capture(name);
   }
   await page.locator('.contact-address').click();await page.waitForTimeout(100);
   const copy=await page.locator('.copy-feedback').textContent();
   const clipboard=await page.evaluate(()=>navigator.clipboard.readText());
   await page.locator('.site-header .menu-toggle').click();await page.waitForTimeout(700);await capture('menu');
   await page.keyboard.press('Escape');
   const escaped=await page.locator('.site-header .menu-toggle').getAttribute('aria-expanded');
   await page.locator('.site-header .menu-toggle').click();await page.waitForTimeout(400);await page.locator('.menu-link').nth(1).click();await page.waitForTimeout(1500);
   const menuDestination=await geometry(page);
   await page.locator('.site-header .brand-link').click();await page.waitForTimeout(1400);
   const homeScroll=await page.evaluate(()=>scrollY);
   const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,duration:r.duration,bytes:r.transferSize})));
   const result={viewport:[width,height],errors,snapshots,copy,clipboard,escaped,menuDestination,homeScroll,requests,resources};results.push(result);
   console.log(JSON.stringify({viewport:[width,height],errors,overflow:snapshots.filter(s=>s.documentWidth>width).map(s=>s.name),copy,escaped,homeScroll}));
   if(errors.length||snapshots.some(s=>s.documentWidth>width)||escaped!=='false'||homeScroll!==0||!clipboard.includes('@'))process.exitCode=1;
   await ctx.close();
  }
  const reduced=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await reduced.newPage();
  await p.goto(origin,{waitUntil:'networkidle'});await p.waitForTimeout(1000);
  await p.screenshot({path:path.join(out,'reduced-mobile-full.png'),fullPage:true});
  results.push({reduced:await p.evaluate(()=>({className:document.querySelector('.experience').className,overflow:document.documentElement.scrollWidth>innerWidth,height:document.documentElement.scrollHeight,hidden:[...document.querySelectorAll('[data-section]')].map(e=>({id:e.id,inert:e.inert,visible:e.checkVisibility({opacityProperty:true,visibilityProperty:true})}))}))});
  await reduced.close();
  // Render the original social artwork to a real PNG for sharing clients.
  const social=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await social.goto(`${origin}/brand/social-preview.svg`);await social.screenshot({path:path.resolve(__dirname,'../../public/brand/social-preview.png')});await social.close();
  await fs.writeFile(path.join(__dirname,process.argv.includes('--quick')?'quick-results.json':'production-results.json'),JSON.stringify(results,null,2));
  for(const [source,target] of [['1440x900-hero.png','implementation-desktop.png'],['390x844-hero.png','implementation-mobile.png']])await fs.copyFile(path.join(out,source),path.join(out,target));
  for(const [source,target] of [['1440x900-scroll-0.png','reference-desktop.png'],['390x844-scroll-0.png','reference-mobile.png']])await fs.copyFile(path.resolve(__dirname,'../inspection/evidence',source),path.join(out,target));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
