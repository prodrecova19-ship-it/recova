const R = (() => {
  const state = { beats: [] };

  const money = n => new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(n);

  async function loadBeats(){
    const res = await fetch("data.json");
    if(!res.ok) throw new Error("Catálogo indisponível.");
    const beats = await res.json();
    state.beats = beats.filter(beat => beat?.audio && String(beat.audio).trim());
    return state.beats;
  }

  function getCart(){
    try{return JSON.parse(localStorage.getItem("recova_cart")||"[]")}catch{return[]}
  }

  function saveCart(items){
    localStorage.setItem("recova_cart",JSON.stringify(items));
    updateCartBadge();
  }

  function addCart(beat, license){
    const price = license==="exclusive" ? beat.exclusive : beat.price;
    const current = getCart().filter(x=>x.slug!==beat.slug);
    current.push({slug:beat.slug,title:beat.title,cover:beat.cover,license,price});
    saveCart(current);
    openDrawer();
    toast(`${beat.title} adicionado ao carrinho.`);
  }

  function updateCartBadge(){
    const count=getCart().length;
    document.querySelectorAll("[data-cart-count]").forEach(x=>x.textContent=count);
  }

  function whatsapp(text){
    const number=(window.RECOVA_CONFIG?.whatsapp||"").replace(/\D/g,"");
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  function toast(msg){
    const el=document.querySelector(".notice"); if(!el) return;
    el.textContent=msg;el.classList.add("show");clearTimeout(window.__toast);
    window.__toast=setTimeout(()=>el.classList.remove("show"),2400);
  }

  function openDrawer(){
    document.querySelector(".drawer")?.classList.add("open");
    document.querySelector(".drawer-backdrop")?.classList.add("open");
    document.body.classList.add("lock");
    renderDrawer();
  }
  function closeDrawer(){
    document.querySelector(".drawer")?.classList.remove("open");
    document.querySelector(".drawer-backdrop")?.classList.remove("open");
    document.body.classList.remove("lock");
  }

  function renderDrawer(){
    const wrap=document.querySelector("#drawer-items"), total=document.querySelector("#drawer-total");
    if(!wrap) return;
    const items=getCart();
    wrap.innerHTML=items.length?items.map((x,i)=>`
      <div class="drawer-item">
        <img src="${x.cover}" alt="">
        <div><strong>${x.title}</strong><span>${x.license==="exclusive"?"Licença exclusiva":"Beat Lease"} · ${money(x.price)}</span></div>
        <button class="cart-remove" data-drawer-remove="${i}">×</button>
      </div>`).join("")
      : `<div style="padding:35px 0;color:#666;font-size:10px;letter-spacing:.1em;text-transform:uppercase">Seu carrinho está vazio.</div>`;
    total.textContent=money(items.reduce((s,x)=>s+Number(x.price),0));
  }

  function card(beat){
    return `<article class="card">
      <a class="cover" href="beat.html?slug=${encodeURIComponent(beat.slug)}">
        <img src="${beat.cover}" alt="Capa de ${beat.title}">
        <div class="cover-play"><button class="play-btn" data-preview="${beat.slug}" aria-label="Ouvir ${beat.title}">▶</button></div>
      </a>
      <div class="card-body">
        <div class="card-title">${beat.title}</div>
        <div class="meta">${beat.genre} · ${beat.bpm} BPM · ${beat.key}</div>
        <div class="card-footer"><span class="price">${money(beat.price)}</span><a class="mini-link" href="beat.html?slug=${encodeURIComponent(beat.slug)}">Detalhes →</a></div>
      </div>
    </article>`;
  }

  function mount(){
    updateCartBadge();
    const menu=document.querySelector(".menu-btn"), links=document.querySelector(".nav-links");
    menu?.addEventListener("click",()=>links?.classList.toggle("open"));
    document.querySelector(".close")?.addEventListener("click",closeDrawer);
    document.querySelector(".drawer-backdrop")?.addEventListener("click",closeDrawer);
    document.addEventListener("click",e=>{
      const p=e.target.closest("[data-preview]");
      if(p){
        const beat=state.beats.find(x=>x.slug===p.dataset.preview);
        if(!beat?.audio){toast("Prévia pendente. Adicione o MP3 em data.json.");return;}

        let a=document.querySelector("#global-audio");
        if(!a){a=document.createElement("audio");a.id="global-audio";document.body.appendChild(a)}

        const allButtons=[...document.querySelectorAll(".play-btn")];
        const isSamePlaying = a.src && a.src.includes(encodeURIComponent(beat.slug)) && !a.paused;

        if(isSamePlaying){
          a.pause();
          allButtons.forEach(btn=>btn.classList.remove("is-playing"));
          return;
        }

        allButtons.forEach(btn=>btn.classList.toggle("is-playing", btn.dataset.preview === beat.slug));
        a.src=beat.audio;
        a.play().catch(()=>toast("Clique novamente para reproduzir."));
      }

      const remove=e.target.closest("[data-drawer-remove]");
      if(remove){
        const items=getCart();items.splice(Number(remove.dataset.drawerRemove),1);saveCart(items);renderDrawer();
      }
    });

    document.addEventListener("visibilitychange",()=>{
      const a=document.querySelector("#global-audio");
      if(document.hidden && a && !a.paused){ a.pause(); }
    });
  }

  return {state,money,loadBeats,getCart,saveCart,addCart,updateCartBadge,whatsapp,toast,openDrawer,closeDrawer,renderDrawer,card,mount};
})();
window.R=R;
document.addEventListener("DOMContentLoaded",()=>R.mount());
