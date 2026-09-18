const fs=require("fs");
const path=require("path");
const root=path.resolve(__dirname,"..");
const beats=JSON.parse(fs.readFileSync(path.join(root,"data.json"),"utf8"));

if(!Array.isArray(beats)||beats.length<1) throw new Error("Catálogo vazio.");
const slugs=new Set();
for(const b of beats){
  for(const k of ["id","slug","title","genre","bpm","key","price","exclusive","cover","audio"]){
    if(!(k in b)) throw new Error(`Campo ausente: ${k}`);
  }
  if(slugs.has(b.slug)) throw new Error(`Slug duplicado: ${b.slug}`);
  slugs.add(b.slug);
  if(!Number.isFinite(b.bpm)||b.bpm<40||b.bpm>250) throw new Error(`BPM inválido: ${b.slug}`);
  if(b.price<=0||b.exclusive<=0) throw new Error(`Preço inválido: ${b.slug}`);
}
for(const file of ["index.html","catalog.html","beat.html","contato.html","carrinho.html","css/style.css","js/app.js"]){
  if(!fs.existsSync(path.join(root,file))) throw new Error(`Arquivo ausente: ${file}`);
}
console.log(`RECOVA OK — ${beats.length} beats, slugs únicos e arquivos principais encontrados.`);
