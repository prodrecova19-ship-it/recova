document.addEventListener("DOMContentLoaded",async()=>{
  const host=document.querySelector("#beat-detail"); if(!host) return;
  try{
    const beats=await R.loadBeats();
    const slug=new URLSearchParams(location.search).get("slug")||beats[0]?.slug;
    const b=beats.find(x=>x.slug===slug);
    if(!b){host.innerHTML="<div style='padding:60px;color:#777'>Beat não encontrado.</div>";return}

    host.innerHTML=`
      <div class="image-box"><img src="${b.cover}" alt="Capa de ${b.title}"></div>
      <div class="detail-panel">
        <div class="eyebrow">${b.genre}</div>
        <h1>${b.title}</h1>
        <div class="detail-meta">${b.bpm} BPM · ${b.key} · PROD. RECOVA</div>
        ${b.audio?`<audio controls preload="metadata" src="${b.audio}"></audio>`:`<div class="field" style="margin-top:22px;color:#666">Preview ainda não cadastrado.</div>`}

        <div class="license-box">
          <div class="license selected">
            <div class="license-top"><span class="license-name">Beat Lease</span><strong class="license-price">${R.money(b.price)}</strong></div>
            <div class="license-copy">Use o beat em um projeto com licença não exclusiva. Arquivos entregues conforme o pacote escolhido.</div>
          </div>
          <div class="license">
            <div class="license-top"><span class="license-name">Licença exclusiva</span><strong class="license-price">${R.money(b.exclusive)}</strong></div>
            <div class="license-copy">Uso exclusivo após confirmação da compra. Ideal para single, EP, álbum ou campanha específica.</div>
          </div>
        </div>

        <div class="purchase-actions">
          <button class="btn primary" id="lease">Adicionar ao carrinho</button>
          <button class="btn" id="exclusive">Adicionar licença exclusiva</button>
          <a class="btn" id="talk" target="_blank" rel="noopener">Falar com RECOVA</a>
        </div>
        <div class="terms">Compra e licenciamento são finalizados diretamente com o produtor neste MVP. As condições definitivas podem ser formalizadas em contrato/licença.</div>
      </div>`;

    document.querySelector("#lease").onclick=()=>R.addCart(b,"lease");
    document.querySelector("#exclusive").onclick=()=>R.addCart(b,"exclusive");
    document.querySelector("#talk").href=R.whatsapp(`Olá, RECOVA! Tenho interesse no beat "${b.title}".`);
  }catch(e){host.innerHTML="<div style='padding:60px;color:#777'>Erro ao carregar o beat.</div>";console.error(e)}
});
