const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH);
const fs=require('node:fs/promises');
const path=require('node:path');
const {state}=require('./inspect-scroll.cjs');
const out=path.join(__dirname,'evidence');
async function save(page,name){await page.screenshot({path:path.join(out,`${name}.png`)});return {name,state:await state(page)};}
async function trace(page,label,action,ms=2000){
 await page.evaluate(duration=>{
  window.__inspectionTrace=[];const start=performance.now();
  const tick=()=>{const t=performance.now()-start;window.__inspectionTrace.push({t:Math.round(t),scroll:scrollY,elements:[...document.querySelectorAll('#smooth-content,#loader,h1.hero-pin,.hero-sub.hero-pin:not(.hero-sub-glow),.hero-tag.hero-pin:not(.hero-tag-glow),.pcard-slot,.pcard,.proj-title,.cword,#cur-ring,#cur-dot,#cur-visit,#nav-dot,#contact>.fade-blur')].map(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {id:el.id,cl:el.className,rect:[r.x,r.y,r.width,r.height].map(x=>Math.round(x)),opacity:s.opacity,transform:s.transform,filter:s.filter,clip:s.clipPath,color:s.color};})});if(t<duration)requestAnimationFrame(tick);};requestAnimationFrame(tick);
 },ms);
 await action();await page.waitForTimeout(ms+100);
 await fs.writeFile(path.join(out,`${label}-trace.json`),JSON.stringify(await page.evaluate(()=>window.__inspectionTrace)));
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write']});
  const page=await context.newPage();
  await page.goto('https://milancompain.com/',{waitUntil:'domcontentloaded'});
  const records=[];
  await trace(page,'desktop-loading',async()=>{},4500);
  await page.mouse.move(500,300);records.push(await save(page,'desktop-cursor-idle'));
  await trace(page,'desktop-nav-hover',()=>page.locator('nav a').nth(1).hover(),1000);
  records.push(await save(page,'desktop-nav-hover'));
  await trace(page,'desktop-nav-about',()=>page.locator('nav a').nth(1).click(),3000);
  records.push(await save(page,'desktop-nav-about-settled'));
  await trace(page,'desktop-nav-projects',()=>page.locator('nav a').nth(2).click(),3000);
  records.push(await save(page,'desktop-nav-projects-settled'));
  await page.evaluate(()=>scrollTo({top:7.6*innerHeight,behavior:'instant'}));await page.waitForTimeout(2200);
  records.push(await save(page,'desktop-project-first-settled'));
  await trace(page,'desktop-project-hover',()=>page.mouse.move(400,470),1200);
  records.push(await save(page,'desktop-project-first-hover'));
  await trace(page,'desktop-project-unhover',()=>page.mouse.move(700,800),1000);
  await page.evaluate(()=>scrollTo({top:9.3*innerHeight,behavior:'instant'}));await page.waitForTimeout(2200);
  records.push(await save(page,'desktop-project-second-settled'));
  await page.mouse.move(1000,480);await page.waitForTimeout(1000);records.push(await save(page,'desktop-project-second-hover'));
  await page.evaluate(()=>scrollTo({top:11.1*innerHeight,behavior:'instant'}));await page.waitForTimeout(2200);
  records.push(await save(page,'desktop-project-third-settled'));
  await trace(page,'desktop-project-link-hover',()=>page.mouse.move(400,470),1200);
  records.push(await save(page,'desktop-project-third-hover'));
  await trace(page,'desktop-nav-contact',()=>page.locator('nav a').nth(3).click(),3000);
  records.push(await save(page,'desktop-contact-settled'));
  await page.locator('#contact .mail').click();await page.waitForTimeout(200);
  records.push(await save(page,'desktop-contact-copy-feedback'));
  const clipboard=await page.evaluate(async()=>({matchesDisplayed:await navigator.clipboard.readText()===document.querySelector('#contact .mail').textContent.trim()}));
  await page.locator('nav button').nth(1).click();await page.waitForTimeout(300);
  records.push(await save(page,'desktop-language-switched'));
  await trace(page,'desktop-return-top',()=>page.locator('nav a').first().click(),3000);
  await trace(page,'desktop-wheel',()=>page.mouse.wheel(0,600),2200);
  records.push(await save(page,'desktop-wheel-settled'));
  const linkBehaviors=await page.evaluate(()=>[...document.querySelectorAll('a')].map(el=>({cl:el.className,kind:el.getAttribute('href')?.startsWith('#')?'anchor':el.getAttribute('href')?.startsWith('mailto:')?'mailto':'external',target:el.target,tabIndex:el.tabIndex})));
  await fs.writeFile(path.join(out,'desktop-interactions.json'),JSON.stringify({clipboard,linkBehaviors,records},null,2));
  console.log('Desktop interaction tests complete');
  await context.close();
  for(const [width,height] of [[768,1024],[390,844]]){
   const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:width<500,hasTouch:true});
   const p=await ctx.newPage();await p.goto('https://milancompain.com/',{waitUntil:'networkidle'});await p.waitForTimeout(4000);
   const steps=await p.evaluate(()=>{const h=innerHeight;const nodes=[...document.querySelectorAll('#about,#projHeader,.proj-seg,#outro,#contact')];return nodes.flatMap(el=>{const y=el.getBoundingClientRect().y;return [{label:el.id+'-start',y},{label:el.id+'-middle',y:Math.min(y+el.clientHeight*.5,document.documentElement.scrollHeight-h)}]})});
   const results=[];
   for(const step of steps){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),step.y);await p.waitForTimeout(1800);results.push({...step,...await save(p,`${width}x${height}-${step.label}-settled`)});}
   await p.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await p.waitForTimeout(2500);results.push(await save(p,`${width}x${height}-contact-bottom`));
   await p.locator('nav button').nth(1).tap();await p.waitForTimeout(200);results.push(await save(p,`${width}x${height}-language-switch`));
   await p.locator('nav a').first().tap();await p.waitForTimeout(2500);results.push(await save(p,`${width}x${height}-tap-home`));
   await fs.writeFile(path.join(out,`${width}x${height}-extended.json`),JSON.stringify(results,null,2));await ctx.close();console.log(`Extended ${width}x${height} complete`);
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
