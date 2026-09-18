document.addEventListener("DOMContentLoaded",async()=>{
  const grid=document.querySelector("#catalog-grid"); if(!grid) return;
  try{
    const beats=await R.loadBeats();
    const filters=[...document.querySelectorAll("[data-genre]")];
    const search=document.querySelector("#search");
    const count=document.querySelector("#count");
    const clearBtn=document.querySelector("#clear-filters");
    let genre="Todos", q="";

    const render=()=>{
      const list=beats.filter(b=>(genre==="Todos"||b.genre===genre)&&(`${b.title} ${b.genre} ${b.bpm} ${b.key}`).toLowerCase().includes(q.toLowerCase()));

      if(!list.length){
        grid.innerHTML=`<div style="grid-column:1/-1;padding:64px 24px;text-align:center;border:1px solid #202020;border-radius:14px;background:#0d0d0d;color:#8d8d8d;line-height:1.7;">
          <strong style="display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#fff;margin-bottom:8px;">Nenhum resultado</strong>
          Tente outra palavra-chave ou limpe os filtros para ver o catálogo completo.
        </div>`;
      } else {
        grid.innerHTML=list.map(R.card).join("");
      }

      count.textContent=`${list.length} ${list.length===1 ? 'beat encontrado' : 'beats encontrados'}`;
    };

    filters.forEach(f=>f.addEventListener("click",()=>{
      filters.forEach(x=>x.classList.remove("active"));
      f.classList.add("active");
      genre=f.dataset.genre;
      render();
    }));

    search?.addEventListener("input",e=>{ q=e.target.value.trim(); render(); });
    clearBtn?.addEventListener("click",()=>{
      q=""; genre="Todos";
      filters.forEach(x=>x.classList.toggle("active", x.dataset.genre === "Todos"));
      search.value="";
      render();
    });

    render();
  }catch(e){grid.innerHTML="<div style='padding:60px;color:#777'>Erro ao carregar o catálogo.</div>";console.error(e)}
});
