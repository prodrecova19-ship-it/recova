document.addEventListener("DOMContentLoaded",async()=>{
  const host=document.querySelector("#home-grid"); if(!host) return;
  try{
    const beats=await R.loadBeats();
    host.innerHTML=beats.slice(0,4).map(R.card).join("");
  }catch(e){host.innerHTML='<div class="empty">Falha ao carregar o catálogo.</div>';console.error(e)}
});
