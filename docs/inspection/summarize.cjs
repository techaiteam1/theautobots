const fs=require('node:fs');
const path=require('node:path');
const dir=path.join(__dirname,'evidence');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const mode=process.argv[2]||'layout';
if(mode==='layout'){
 for(const vp of ['1440x900','1280x800','768x1024','390x844']){
  const data=read(`${vp}-scroll.json`),nodes=data[0].state.elements;
  console.log(vp,JSON.stringify(nodes.filter(e=>e.parent==='smooth-content').map(e=>({role:e.id||e.cl,rect:e.rect}))));
  console.log('type',JSON.stringify(nodes.filter(e=>e.tag==='h1'||e.tag==='h2'||e.tag==='h3'||e.cl==='mail'||e.cl==='nav-links'||e.cl==='nav-brand'||e.cl==='hero-sub hero-pin'||e.cl==='hero-tag serif hero-pin'||e.cl==='cw-t1'||e.cl==='cw-t2'||e.parent==='fade-blur'||e.cl==='pdesc'||e.cl==='pcard-meta'||e.tag==='footer').map(e=>({role:e.cl||e.tag,rect:e.rect,font:e.style.fontSize,weight:e.style.fontWeight,line:e.style.lineHeight,tracking:e.style.letterSpacing,margin:e.style.margin,padding:e.style.padding,display:e.style.display}))));
 }
}
if(mode==='motion'){
 const data=read('1440x900-scroll.json');
 for(const d of data)console.log(JSON.stringify({vh:d.vh,cards:d.state.elements.filter(e=>e.cl==='pcard-anim').map(e=>({rect:e.rect,opacity:e.style.opacity,transform:e.style.transform,visibility:e.style.visibility})),title:d.state.elements.filter(e=>e.cl==='proj-title').map(e=>({opacity:e.style.opacity,filter:e.style.filter})),words:d.state.elements.filter(e=>e.cl.startsWith('cword')&&Number(e.style.opacity)>.05).map(e=>({role:e.cl,rect:e.rect,opacity:e.style.opacity,filter:e.style.filter,transform:e.style.transform}))}));
}
if(mode==='trace'){
 for(const file of fs.readdirSync(dir).filter(f=>f.endsWith('-trace.json'))){
  const data=read(file);const frames=[0,.25,.5,.75,1].map(p=>data[Math.round(p*(data.length-1))]);
  console.log(file,JSON.stringify(frames.map(f=>({t:f.t,scroll:f.scroll,elements:f.elements.filter(e=>e.id==='smooth-content'||e.id==='loader'||e.id==='cur-ring'||e.id==='cur-dot'||e.id==='nav-dot'||e.cl==='hero-name hero-pin'||e.cl==='fade-blur'||e.cl==='fade-blur in'||e.cl==='pcard').map(e=>({id:e.id||e.cl,rect:e.rect,opacity:e.opacity,transform:e.transform,filter:e.filter,color:e.color}))}))));
 }
}
if(mode==='interactions'){
 const data=read('desktop-interactions.json');console.log('clipboard',data.clipboard,'links',data.linkBehaviors);
 for(const r of data.records)console.log(r.name,JSON.stringify({y:r.state.y,nodes:r.state.elements.filter(e=>e.id==='cur-ring'||e.id==='cur-dot'||e.id==='cur-visit'||e.id==='nav-dot'||e.cl==='card-mag'||e.cl==='pcard-anim'||e.cl==='pcard'||e.cl.startsWith('visit-')||e.cl==='mail'||e.parent==='cur-visit'||e.parent==='contact'||e.parent==='mail-wrap').map(e=>({role:e.id||e.cl,rect:e.rect,opacity:e.style.opacity,transform:e.style.transform,filter:e.style.filter,color:e.style.color,display:e.style.display,visibility:e.style.visibility}))}));
}
if(mode==='timing'){
 for(const name of ['desktop-loading','desktop-nav-about','desktop-nav-projects','desktop-nav-contact','desktop-return-top','desktop-wheel','desktop-nav-hover']){
  const data=read(`${name}-trace.json`);const last=data.at(-1);const smooth=f=>f.elements.find(e=>e.id==='smooth-content')?.transform;const ty=f=>Number(smooth(f)?.match(/,\s*(-?[\d.]+)\)$/)?.[1]||0);
  const settling=data.find(f=>Math.abs(ty(f)-ty(last))<1)?.t;
  const samples=[0,100,200,300,450,600,900,1200,1800,2400,3000,4000].filter(t=>t<last.t).map(t=>data.find(f=>f.t>=t)).map(f=>({t:f.t,scroll:f.scroll,contentY:ty(f),loader:f.elements.find(e=>e.id==='loader')?.opacity,hero:f.elements.find(e=>e.cl==='hero-name hero-pin')?.opacity,contact:f.elements.find(e=>e.cl.startsWith('fade-blur')),ring:f.elements.find(e=>e.id==='cur-ring')?.transform}));
  console.log(name,JSON.stringify({frames:data.length,settlingMs:settling,samples}));
 }
}
if(mode==='breakpoints'){
 for(const d of read('breakpoints.json')){const find=sel=>d.nodes.find(sel);console.log(JSON.stringify({w:d.width,touch:d.touch,height:d.h,nav:find(e=>e.cl==='nav-links').style.display,traverse:find(e=>e.id==='traverse').rect[3],card:find(e=>e.cl==='pcard-slot left').rect,caption:find(e=>e.cl==='pdesc').style.fontSize,title:find(e=>e.cl==='proj-title').rect,heroSub:find(e=>e.cl==='hero-sub hero-pin').style.fontSize}));}
}
if(mode==='detail'){
 for(const d of read('motion-detail.json'))console.log(JSON.stringify({vh:d.vh,nodes:d.nodes.filter(e=>e.tag==='H1'||e.cl==='pcard-anim').map(e=>({role:e.cl,opacity:e.style.opacity,transform:e.style.transform,filter:e.style.filter}))}));
 console.log('loader',JSON.stringify(read('loader-detail.json').nodes.filter(e=>e.id==='loader'||e.cl.startsWith('ld-'))));
}
