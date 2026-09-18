document.addEventListener("DOMContentLoaded",async()=>{
  const grid=document.querySelector("#catalog-grid"); if(!grid) return;
  try{
    const beats=await R.loadBeats();
    const filters=[...document.querySelectorAll("[data-genre]")];
    const search=document.querySelector("#search");
    const count=document.querySelector("#count");
    let genre="Todos", q="";

    const render=()=>{
      const list=beats.filter(b=>(genre==="Todos"||b.genre===genre)&&(`${b.title} ${b.genre} ${b.bpm} ${b.key}`).toLowerCase().includes(q.toLowerCase()));
      grid.innerHTML=list.length?list.map(R.card).join(""):`<div style="grid-column:1/-1;padding:60px;text-align:center;color:#666">Nenhum beat encontrado.</div>`;
      count.textContent=`${list.length} ${list.length===1 ? 'beat encontrado' : 'beats encontrados'}`;
    };

    filters.forEach(f=>f.addEventListener("click",()=>{
      filters.forEach(x=>x.classList.remove("active"));f.classList.add("active");genre=f.dataset.genre;render();
    }));
    search?.addEventListener("input",e=>{q=e.target.value.trim();render()});
    render();
  }catch(e){grid.innerHTML="<div style='padding:60px;color:#777'>Erro ao carregar o catálogo.</div>";console.error(e)}
});
