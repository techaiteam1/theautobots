const {chromium} = require(process.env.PLAYWRIGHT_CORE_PATH);
const fs = require('node:fs/promises');
const path = require('node:path');
const output = path.join(__dirname, 'evidence');

async function state(page) {
  return page.evaluate(() => {
    const all = [...document.querySelectorAll('body *')].filter(el => !['SCRIPT','STYLE','LINK','META','PATH'].includes(el.tagName) && !(el instanceof SVGElement));
    return {y:scrollY,height:document.documentElement.scrollHeight, elements:all.slice(0,200).map(el=> {
      const r=el.getBoundingClientRect(), s=getComputedStyle(el);
      return {tag:el.tagName.toLowerCase(),id:el.id,cl:typeof el.className==='string'?el.className:'',parent:el.parentElement?.id||el.parentElement?.className||el.parentElement?.tagName,
        rect:[r.x,r.y,r.width,r.height].map(x=>Math.round(x*100)/100),
        style:Object.fromEntries(['position','display','opacity','visibility','transform','transformOrigin','clipPath','filter','zIndex','overflow','pointerEvents','fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','backgroundColor','gap','padding','margin','borderRadius','mixBlendMode','transitionDuration','transitionTimingFunction'].map(k=>[k,s[k]]))};
    })};
  });
}

async function main(){
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 try {
  for(const [width,height] of [[1440,900],[1280,800],[768,1024],[390,844]]) {
   const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,isMobile:width<500,hasTouch:width<800});
   const page=await context.newPage();
   await page.goto('https://milancompain.com/',{waitUntil:'networkidle'});
   await page.waitForTimeout(4500);
   const records=[];
   for(const vh of [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.8]) {
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),vh*height);
    await page.waitForTimeout(450);
    const name=`${width}x${height}-scroll-${vh}`;
    await page.screenshot({path:path.join(output,`${name}.png`)});
    records.push({name,vh,state:await state(page)});
   }
   await fs.writeFile(path.join(output,`${width}x${height}-scroll.json`),JSON.stringify(records,null,2));
   console.log(`Completed scroll inspection ${width}x${height}`);
   await context.close();
  }
 }finally{await browser.close();}
}
module.exports={state};
if(require.main===module) main().catch(e=>{console.error(e);process.exitCode=1;});
