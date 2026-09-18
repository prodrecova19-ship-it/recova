document.addEventListener("DOMContentLoaded",()=>{
  const list=document.querySelector("#cart-list"), total=document.querySelector("#cart-total"), checkout=document.querySelector("#checkout");
  if(!list)return;
  const render=()=>{
    const items=R.getCart();
    if(!items.length){
      list.innerHTML='<div style="padding:65px;text-align:center;color:#666;font-size:10px;letter-spacing:.13em;text-transform:uppercase">Seu carrinho está vazio.<br><br><a class="btn" href="catalog.html">Ir para o catálogo</a></div>';
      total.textContent=R.money(0);return;
    }
    list.innerHTML=items.map((x,i)=>`<div class="cart-item">
      <img class="cart-thumb" src="${x.cover}" alt="">
      <div><h3>${x.title}</h3><div class="meta">${x.license==="exclusive"?"Licença exclusiva":"Beat Lease"} · ${R.money(x.price)}</div></div>
      <button class="cart-remove" data-remove="${i}">Remover</button>
    </div>`).join("");
    total.textContent=R.money(items.reduce((s,x)=>s+Number(x.price),0));
  };
  list.addEventListener("click",e=>{
    const b=e.target.closest("[data-remove]"); if(!b)return;
    const items=R.getCart();items.splice(Number(b.dataset.remove),1);R.saveCart(items);render();
  });
  checkout.addEventListener("click",()=>{
    const items=R.getCart();
    if(!items.length){R.toast("Carrinho vazio.");return}
    const lines=items.map(x=>`- ${x.title} — ${x.license==="exclusive"?"exclusiva":"lease"} — ${R.money(x.price)}`).join("\n");
    window.open(R.whatsapp(`Olá, RECOVA! Quero conversar sobre esta compra:\n\n${lines}\n\nTotal: ${total.textContent}`),"_blank","noopener");
  });
  render();
});
