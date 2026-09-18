document.addEventListener("DOMContentLoaded",()=>{
  const form=document.querySelector("#contact-form"); if(!form) return;
  const c=window.RECOVA_CONFIG||{};
  document.querySelector("#ig").textContent=c.instagram||"";
  document.querySelector("#mail").textContent=c.email||"";
  document.querySelector("#wa").textContent=c.whatsapp||"";

  form.addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(form),name=String(fd.get("name")||"").trim(),email=String(fd.get("email")||"").trim(),msg=String(fd.get("message")||"").trim();
    if(!name||!email||!msg){R.toast("Preencha todos os campos.");return}
    const text=`Olá, RECOVA!\n\nNome: ${name}\nE-mail: ${email}\n\n${msg}`;
    window.open(R.whatsapp(text),"_blank","noopener");
    form.reset();R.toast("Mensagem preparada no WhatsApp.");
  });
});
