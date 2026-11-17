// Tabs
document.querySelectorAll('[role=tab]').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('[role=tab]').forEach(x=>x.setAttribute('aria-selected',x===b));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id===b.getAttribute('aria-controls')));
}));

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

// Menú móvil
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>document.getElementById('menu').classList.remove('open')));

// Quiz
const steps=[...document.querySelectorAll('.qstep')], prog=document.getElementById('prog'), back=document.getElementById('back');
const ans={}; let cur=0;
function go(i){
  cur=i; steps.forEach((s,k)=>s.classList.toggle('on',k===i));
  prog.style.width=Math.min(100,(i+1)*20)+'%';
  back.hidden = i===0 || i===steps.length-1;
}
steps.forEach((s,i)=>s.querySelectorAll('.opts button').forEach(btn=>btn.addEventListener('click',()=>{
  s.querySelectorAll('button').forEach(x=>x.classList.remove('sel')); btn.classList.add('sel');
  ans[s.dataset.q]=btn.textContent; setTimeout(()=>go(i+1),180);
})));
back.addEventListener('click',()=>go(Math.max(0,cur-1)));
// Envío del formulario
// Usa FormSubmit (gratis, sin servidor). La PRIMERA vez que alguien envíe el formulario,
// FormSubmit mandará un email de activación a la dirección de abajo: hay que pulsar el enlace una vez.
const EMAIL='joanportillo@booking-lab.com';
const LANG=(document.documentElement.lang||'es').slice(0,2);
const T={
  es:{sending:'Enviando…',send:'Enviar y analizar mi operativa →',err:'No se ha podido enviar. Escríbenos a {e} o vuelve a intentarlo.'},
  en:{sending:'Sending…',send:'Send and analyse my operations →',err:'We couldn\'t send your request. Email us at {e} or try again.'},
  ca:{sending:'Enviant…',send:'Envia i analitza la meva operativa →',err:'No s\'ha pogut enviar. Escriu-nos a {e} o torna-ho a provar.'}
}[LANG]||null;
const form=document.getElementById('qform'), ferr=document.getElementById('ferr'), send=document.getElementById('qsend');
form.addEventListener('submit',async e=>{
  e.preventDefault(); ferr.textContent='';
  const d=new FormData(form);
  if(d.get('_honey')) return;
  const datos={
    _subject:'Nueva solicitud web - '+d.get('empresa'),
    _template:'table',
    Idioma:LANG.toUpperCase(), Nombre:d.get('nombre'), Empresa:d.get('empresa'), Telefono:d.get('tel'), Email:d.get('email')||'-',
    Sector:ans.sector||'-', Equipo:ans.equipo||'-', 'Canal principal':ans.canal||'-', 'Lo que mas horas quita':ans.dolor||'-'
  };
  send.disabled=true; send.textContent=(T||{}).sending||'Enviando…';
  try{
    const r=await fetch('https://formsubmit.co/ajax/'+EMAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(datos)});
    const out=await r.json().catch(()=>({}));
    if(!r.ok || String(out.success)==='false') throw new Error(out.message||r.status);
    go(steps.length-1);
  }catch(err){
    ferr.innerHTML=(T||{err:'{e}'}).err.replace('{e}','<a href="mailto:'+EMAIL+'">'+EMAIL+'</a>');
  }finally{
    send.disabled=false; send.textContent=(T||{}).send||'Enviar y analizar mi operativa →';
  }
});
