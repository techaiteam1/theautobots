const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH);
const fs=require('node:fs/promises');
const path=require('node:path');
const out=path.join(__dirname,'evidence');
async function compact(page){return page.evaluate(()=>({y:scrollY,h:document.documentElement.scrollHeight,w:document.documentElement.scrollWidth,coarse:matchMedia('(pointer:coarse)').matches,reduce:matchMedia('(prefers-reduced-motion:reduce)').matches,nodes:[...document.querySelectorAll('html,nav,.nav-links,#traverse,#about,#projHeader,.proj-title,h1.hero-pin,.pcard-slot,.pcard-anim,.card-mag,.pcard,.pdesc,.pcap,.hero-sub.hero-pin,#contact>.fade-blur,#loader,#loader *,#cur-ring')].map(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {tag:el.tagName,id:el.id,cl:el.className,rect:[r.x,r.y,r.width,r.height],style:Object.fromEntries(['position','opacity','display','visibility','fontFamily','fontSize','fontStyle','lineHeight','letterSpacing','transform','filter','backgroundColor','backgroundImage','padding','margin','transitionDuration','transitionTimingFunction','clipPath','zIndex'].map(k=>[k,s[k]]))}})}));}
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});try{
 const records=[];
 for(const touch of [false,true]){
  const ctx=await browser.newContext({viewport:{width:1440,height:900},hasTouch:touch});const p=await ctx.newPage();await p.goto('https://milancompain.com/',{waitUntil:'networkidle'});await p.waitForTimeout(3500);
  for(const width of [1440,1024,901,900,899,801,800,799,769,768,767,701,700,699,641,640,639,601,600,599,480,390]){await p.setViewportSize({width,height:900});await p.waitForTimeout(180);records.push({width,touch,...await compact(p)});}
  await ctx.close();
 }
 await fs.writeFile(path.join(out,'breakpoints.json'),JSON.stringify(records));console.log('Breakpoint probes complete');
 const ctx=await browser.newContext({viewport:{width:1440,height:900}});const p=await ctx.newPage();await p.goto('https://milancompain.com/',{waitUntil:'domcontentloaded'});
 await fs.writeFile(path.join(out,'loader-detail.json'),JSON.stringify(await compact(p)));await p.waitForTimeout(4500);
 const motion=[];
 for(const vh of [0,.05,.1,.15,.2,.25,.3,.4,6.7,6.8,6.9,7,7.1,7.2,8.1,8.2,8.3,8.4,8.5]){await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),vh*900);await p.waitForTimeout(1000);motion.push({vh,...await compact(p)});if([0,.1,.2,.3,.4,6.8,6.9,7,7.1,7.2].includes(vh))await p.screenshot({path:path.join(out,`desktop-detail-${vh}.png`)});}
 await fs.writeFile(path.join(out,'motion-detail.json'),JSON.stringify(motion));
 await p.emulateMedia({reducedMotion:'reduce'});await p.reload({waitUntil:'networkidle'});await p.waitForTimeout(3000);const reduced=await compact(p);await p.screenshot({path:path.join(out,'desktop-reduced-motion.png')});await fs.writeFile(path.join(out,'reduced-motion.json'),JSON.stringify(reduced));
 await p.keyboard.press('Tab');const focus=await p.evaluate(()=>({tag:document.activeElement.tagName,cl:document.activeElement.className,outline:getComputedStyle(document.activeElement).outline}));await fs.writeFile(path.join(out,'keyboard.json'),JSON.stringify(focus));await ctx.close();console.log('Detailed motion and input probes complete');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
