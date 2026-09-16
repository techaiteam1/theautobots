const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH);
const fs=require('node:fs/promises');const path=require('node:path');const crypto=require('node:crypto');
const origin=process.env.SITE_ORIGIN||'http://127.0.0.1:4173';
const out=__dirname;
async function files(dir,prefix=''){const entries=await fs.readdir(dir,{withFileTypes:true});const lists=await Promise.all(entries.map(e=>e.isDirectory()?files(path.join(dir,e.name),`${prefix}${e.name}/`):[`${prefix}${e.name}`]));return lists.flat();}
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});try{
 const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const assets=[];
 for(const file of await files(path.resolve(out,'../../dist'))){const response=await ctx.request.get(`${origin}/${file}`);const expected=await fs.readFile(path.resolve(out,'../../dist',file));assets.push({file,status:response.status(),matches:hash(await response.body())===hash(expected)});}
 await page.goto(origin,{waitUntil:'networkidle'});await page.waitForTimeout(4500);
 const motion=[];
 for(const h of [0,.075,.15,.225,.3,6.8,6.925,7.05,7.175,7.3]){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),h*900);await page.waitForTimeout(900);motion.push(await page.evaluate(()=>{const hero=document.querySelector('.hero-stage'),panel=document.querySelector('.system-panel');return {h:Number(document.querySelector('.experience').dataset.sceneH),heroOpacity:getComputedStyle(hero).opacity,panelOpacity:getComputedStyle(panel).opacity,panelTransform:getComputedStyle(panel).transform};}));await page.screenshot({path:path.join(out,'screenshots',`motion-${h}.png`)});}
 await page.locator('.site-header .menu-toggle').click();await page.waitForTimeout(650);
 const focus=[];for(let i=0;i<12;i++){await page.keyboard.press('Tab');focus.push(await page.evaluate(()=>({inside:document.querySelector('#site-menu').contains(document.activeElement),tag:document.activeElement.tagName})));}
 await page.locator('.menu-motion').click();await page.keyboard.press('Escape');await page.waitForTimeout(800);
 const a=await page.locator('.scene canvas').screenshot();await page.waitForTimeout(600);const b=await page.locator('.scene canvas').screenshot();const pausedStatic=hash(a)===hash(b);
 await page.locator('.site-header .menu-toggle').click();await page.waitForTimeout(500);await page.locator('.menu-motion').click();await page.keyboard.press('Escape');await page.waitForTimeout(1000);
 const performanceSample=await page.evaluate(()=>new Promise(resolve=>{const times=[];let prev=performance.now();const tick=now=>{times.push(now-prev);prev=now;if(times.length<121)requestAnimationFrame(tick);else{const sorted=times.slice(1).sort((a,b)=>a-b);resolve({meanMs:sorted.reduce((a,b)=>a+b,0)/sorted.length,p95Ms:sorted[Math.floor(sorted.length*.95)],over50ms:sorted.filter(x=>x>50).length});}};requestAnimationFrame(tick);}));
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1200);
 // Rebrand layout probe changes only rendered text; source/config stay untouched.
 await page.locator('h1').evaluate(el=>{el.textContent='AUTONOMOUS BUSINESS SYSTEMS';});await page.setViewportSize({width:1280,height:800});await page.waitForTimeout(400);
 const fittedName=await page.locator('h1').boundingBox();
 const metadata=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,ogImage:document.querySelector('meta[property="og:image"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href')||null}));
 await ctx.close();
 const reduced=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await reduced.newPage();await p.goto(origin,{waitUntil:'networkidle'});await p.waitForTimeout(900);
 for(const panel of await p.locator('.system-panel').all()){await panel.scrollIntoViewIfNeeded();await p.waitForTimeout(200);}
 const reducedImages=await p.locator('.media-frame img').evaluateAll(images=>images.map(img=>({loaded:img.complete&&img.naturalWidth>0,src:img.getAttribute('src')})));
 await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,'screenshots','reduced-mobile-full.png'),fullPage:true});
 const reducedA=await p.locator('.scene canvas').screenshot();await p.waitForTimeout(400);const reducedB=await p.locator('.scene canvas').screenshot();
 const result={assets,errors,motion,focus,pausedStatic,performanceSample,fittedName,metadata,reducedImages,reducedStatic:hash(reducedA)===hash(reducedB)};
 await fs.writeFile(path.join(out,'details-results.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({assets:assets.length,assetFailures:assets.filter(a=>a.status!==200||!a.matches),errors,focusTrap:focus.every(f=>f.inside),pausedStatic,performanceSample,fittedName,reducedImages,reducedStatic:result.reducedStatic}));
 if(errors.length||assets.some(a=>a.status!==200||!a.matches)||focus.some(f=>!f.inside)||!pausedStatic||!result.reducedStatic||reducedImages.some(i=>!i.loaded)||!fittedName||fittedName.x<0||fittedName.x+fittedName.width>1280)process.exitCode=1;
 await reduced.close();
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
