// Mechanical redaction of resource URLs/data embedded in computed property values.
// Keep behavioral evidence, never asset payloads or asset source.
const fs=require('node:fs');
const path=require('node:path');
const folder=path.join(__dirname,'evidence');
let changed=0;
function redact(value){
 if(typeof value==='string')return value.replace(/url\([\s\S]*?\)/g,'[resource omitted]');
 if(Array.isArray(value))return value.map(redact);
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,redact(v)]));
 return value;
}
for(const name of fs.readdirSync(folder).filter(n=>n.endsWith('.json'))){
 const file=path.join(folder,name),original=fs.readFileSync(file,'utf8');
 if(!original.includes('url('))continue;
 fs.writeFileSync(file,JSON.stringify(redact(JSON.parse(original))));changed++;
}
console.log(`Redacted resource references in ${changed} computed-measurement files.`);
