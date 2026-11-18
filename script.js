var CUR='ARS';try{if(window.name!=='pv-embed'&&localStorage.getItem('pv-cur')==='USD')CUR='USD'}catch(e){}
let LANG='es';const L=(a,b)=>LANG==='en'?b:a;
const EXSEL='.roles span:nth-child(n+2),.slogan,.about h3,.about p:nth-of-type(2),.chip,.hl li,.f:not([data-f=all]),#exp,.sk .tags,.edu .eh,.edu>div:first-child .mini,.edu>div:nth-child(2)>.card';
let EXS=[...document.querySelectorAll(EXSEL)].map(el=>[el,el.innerHTML]),EXT=null;
const EMB=window.name==='pv-embed';
const mm=document.getElementById('mm');
document.getElementById('mb').onclick=()=>mm.classList.toggle('open');
mm.querySelectorAll('a').forEach(a=>a.onclick=()=>mm.classList.remove('open'));
document.querySelectorAll('.f').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.f').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.exp').forEach(c=>c.style.display=(b.dataset.f==='all'||c.classList.contains(b.dataset.f))?'':'none');
});
let tt;
function toast(msg,ic){
  const t=document.getElementById('toast');
  document.getElementById('tm').textContent=tr(msg);
  document.getElementById('ti').className='fas '+ic;
  t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),3000);
}
function copy(text,msg){
  const done=()=>toast(msg,'fa-copy');
  if(navigator.clipboard)navigator.clipboard.writeText(text).then(done,done);
  else{const i=document.createElement('input');i.value=text;document.body.appendChild(i);i.select();document.execCommand('copy');i.remove();done();}
}
function downloadCV(){toast('Acá se descarga tu currículum','fa-file-arrow-down');}
const root=document.documentElement,pv=document.getElementById('pv'),pp=document.getElementById('pp'),sws=document.querySelectorAll('.sw');
function openP(o){pp.classList.toggle('open',o);pv.setAttribute('aria-expanded',o);if(o)loadFonts()}
pv.onclick=()=>openP(!pp.classList.contains('open'));
document.getElementById('px').onclick=()=>openP(false);
document.addEventListener('keydown',e=>{if(e.key==='Escape')openP(false)});
function hints(){
  const g=id=>document.getElementById(id);
  const sb0=document.querySelector('#pp .sw[data-t="'+root.dataset.theme+'"]');
  if(sb0){
    g('ch').textContent=sb0.dataset.p==='1'?L('Este color es del Paquete completo +.','This color is part of the Complete package +.'):L('Incluido en el Paquete completo (3 colores).','Included in the Complete package (3 colors).');
    g('mh').textContent=sb0.dataset.p==='0'?L('Claro y oscuro de este color: incluido en el Paquete completo.','Light and dark mode for this color: included in the Complete package.'):L('Claro y oscuro de este color: Paquete completo +.','Light and dark mode for this color: Complete package +.');
  }
  const fb=document.querySelector('.ft[data-f="'+(root.dataset.font||'base')+'"]');
  if(fb)g('th').textContent=fb.dataset.p==='1'?L('Esta tipografía es del Paquete completo +.','This typeface is part of the Complete package +.'):L('Incluida en el Paquete completo (base, Elegante y Moderna).','Included in the Complete package (Base, Elegant and Modern).');
  const bb=root.dataset.bg&&document.querySelector('.bgb[data-b="'+root.dataset.bg+'"]');
  if(bb)g('bh').textContent=bb.dataset.p==='1'?L('Este fondo es del Paquete completo +.','This background is part of the Complete package +.'):L('Incluido en el Paquete completo (3 fondos: cuadrícula, aurora y liso).','Included in the Complete package (3 backgrounds: grid, aurora and plain).');
}
function theme(t,anim){
  if(anim){root.classList.add('tt');setTimeout(()=>root.classList.remove('tt'),400);}
  root.dataset.theme=t;hints();if(t==='white')mode('light');else if(t==='black')mode('dark');
  document.querySelectorAll('.sw').forEach(s=>s.setAttribute('aria-pressed',s.dataset.t===t));
  document.querySelector('meta[name=theme-color]').content=getComputedStyle(root).getPropertyValue('--bg').trim();
  try{localStorage.setItem('pv-theme',t)}catch(e){}
}
sws.forEach(s=>s.onclick=()=>theme(s.dataset.t,true));
let sv,seen;
try{sv=localStorage.getItem('pv-theme');seen=sessionStorage.getItem('pv-seen')}catch(e){}
if(sv&&document.querySelector('.sw[data-t="'+sv+'"]'))theme(sv,false);
if(!seen&&!EMB&&!/[?&](t|m|f|b|p|n|r|c|e|cur)=/.test(location.search)){setTimeout(()=>openP(true),600);try{sessionStorage.setItem('pv-seen','1')}catch(e){}}
const bp=document.getElementById('bp'),cs=document.getElementById('cs');
document.getElementById('bv').onclick=()=>{openP(false);bp.showModal()};
bp.querySelector('.bx').onclick=()=>bp.close();
bp.onclick=e=>{const r=bp.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)bp.close()};
document.querySelectorAll('#pp .sw').forEach(n=>cs.appendChild(n.cloneNode(true)));
cs.querySelectorAll('.sw').forEach(b=>b.onclick=()=>theme(b.dataset.t,true));
theme(root.dataset.theme||'green',false);
const cf=document.getElementById('cf'),cm=document.getElementById('cm'),cform=document.getElementById('cform');
document.getElementById('qm').onclick=()=>openForm();
cf.querySelector('.bx').onclick=()=>cf.close();
cf.onclick=e=>{const r=cf.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)cf.close()};
cform.onsubmit=async e=>{
  e.preventDefault();
  const b=cform.querySelector('button[type=submit]');
  b.disabled=true;cm.className='';cm.textContent=L('Enviando...','Sending...');
  try{
    const r=await fetch(cform.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(cform)});
    const j=await r.json();
    if(!j.success)throw 0;
    cform.reset();cm.className='ok';cm.textContent=L('¡Listo! Recibí tu mensaje y te respondo por mail.','Done! I got your message and I will reply by email.');
  }catch(err){cm.className='er';cm.textContent=L('No se pudo enviar. Probá de nuevo en un momento.','Could not send. Please try again in a moment.')}
  b.disabled=false;
};
// ---- aviso de novedades (email opcional)
const nform=document.getElementById('nform'),nlm=document.getElementById('nlm');
nform.onsubmit=async e=>{
  e.preventDefault();
  const b=nform.querySelector('button[type=submit]');
  b.disabled=true;nlm.className='';nlm.textContent=L('Enviando...','Sending...');
  nform.elements.idioma.value=LANG;
  try{
    const r=await fetch(nform.action,{method:'POST',headers:{Accept:'application/json'},body:new FormData(nform)});
    const j=await r.json();
    if(!j.success)throw 0;
    nform.reset();nlm.className='ok';nlm.textContent=L('¡Gracias! Te aviso cuando haya novedades.','Thanks! I will let you know when there is news.');
    track('/novedades-suscripcion','Suscripción a novedades',true);
  }catch(err){nlm.className='er';nlm.textContent=L('No se pudo enviar. Probá de nuevo en un momento.','Could not send. Please try again in a moment.')}
  b.disabled=false;
};
const md=document.getElementById('md');
function mode(m,anim){
  if(anim){root.classList.add('tt');setTimeout(()=>root.classList.remove('tt'),400);}
  root.dataset.mode=m;
  document.querySelectorAll('#md button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m));
  document.querySelector('meta[name=theme-color]').content=getComputedStyle(root).getPropertyValue('--bg').trim();
  try{localStorage.setItem('pv-mode',m)}catch(e){}
}
md.querySelectorAll('button').forEach(b=>b.onclick=()=>mode(b.dataset.m,true));
let sm;try{sm=localStorage.getItem('pv-mode')}catch(e){}
mode(sm==='light'?'light':'dark',false);
// WhatsApp: reemplazá por tu número con código de país, sin + ni espacios (Argentina: 549 + código de área + número)
const WA_NUM='5492914499050';
document.getElementById('wa').href='https://wa.me/'+WA_NUM+'?text='+encodeURIComponent('Hola! Vi la preview de portafolios virtuales y quiero el mío.');
function goPlans(){document.getElementById('planes').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'})}
document.getElementById('goplans').onclick=goPlans;
document.getElementById('gofaq').onclick=()=>document.getElementById('faq').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
document.getElementById('vp').onclick=()=>{openP(false);bp.showModal();setTimeout(goPlans,60)};
document.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>openForm(b.dataset.plan));
const XF='https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Serif+Display&family=Nunito:wght@700;800&family=Bebas+Neue&family=Montserrat:wght@600;700&family=Cormorant+Garamond:wght@600;700&family=Orbitron:wght@600;700&display=swap';
let xfOk=false;
function loadFonts(){if(xfOk)return;xfOk=true;const l=document.createElement('link');l.rel='stylesheet';l.href=XF;document.head.appendChild(l)}
function font(f){
  if(!['base','serif','wide','mono'].includes(f))loadFonts();
  root.dataset.font=f;
  document.querySelectorAll('.ft[data-f]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===f));
  const bt=document.querySelector('.ft[data-f="'+f+'"]');
  hints();
}
document.querySelectorAll('.ft[data-f]').forEach(b=>b.onclick=()=>font(b.dataset.f));
font('base');
const av=document.getElementById('av');
document.querySelectorAll('#pf button').forEach(b=>b.onclick=()=>{av.hidden=b.dataset.p!=='on';document.querySelectorAll('#pf button').forEach(x=>x.setAttribute('aria-pressed',x===b))});

const bh=document.getElementById('bh');
function bg(b){
  root.dataset.bg=b;
  document.querySelectorAll('.bgb').forEach(x=>x.setAttribute('aria-pressed',x.dataset.b===b));
  hints();
  try{localStorage.setItem('pv-bg',b)}catch(e){}
}
document.querySelectorAll('.bgb').forEach(b=>b.onclick=()=>bg(b.dataset.b));
let sb;try{sb=localStorage.getItem('pv-bg')}catch(e){}
bg(sb&&document.querySelector('.bgb[data-b="'+sb+'"]')?sb:'grid');

// ---- "Probalo con tu nombre": nombre, profesión y ciudad en vivo
const ME={n:'',r:'',c:''},T0=document.title;
var SMP=null;
function V(){const p=SMP?exPersona():null;return{n:ME.n||(p&&p.n)||'',r:ME.r||(p&&p.r)||'',c:ME.c||(p&&p.c)||''}}
const mTx=el=>[...el.childNodes].find(n=>n.nodeType===3&&n.nodeValue.trim());
const g$=id=>document.getElementById(id);
const mn=g$('mn'),mr=g$('mr'),mc=g$('mc');
const SMALLW=new Set(['de','del','la','las','los','el','y','e','da','do','dos','das','van','von','di','du','le','al']);
const mClean=s=>String(s||'').replace(/[\u0000-\u001f\u007f<>]/g,'').replace(/\s+/g,' ').trim().slice(0,40);
const up1=w=>w.charAt(0).toLocaleUpperCase('es')+w.slice(1);
const capWords=s=>s.split(' ').map((w,i)=>(i>0&&SMALLW.has(w))?w:(w===w.toLowerCase()?up1(w):w)).join(' ');
const capFirst=s=>s===s.toLowerCase()?up1(s):s;
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const MAIL0='nombre.apellido@email.com';
const slots=[
  ['lgI',()=>{const w=V().n.split(' '),a=[...w[0]],b=[...w[w.length-1]];return(w.length>1?a[0]+b[0]:a.slice(0,2).join('')).toLocaleUpperCase('es')},'n'],
  ['lgN',()=>V().n.toLocaleUpperCase('es'),'n'],
  ['h1',()=>{const w=V().n.split(' ');return w.length>1?w.slice(0,-1).join(' ')+' ':''},'n',()=>g$('h1').firstChild],
  ['h1b',()=>{const w=V().n.split(' ');return w[w.length-1]},'n'],
  ['bdC',()=>V().c,'c'],
  ['rlA',()=>V().r,'r'],
  ['abR',()=>V().r,'r'],
  ['bcN',()=>V().n,'n'],
  ['bcR',()=>V().r,'r'],
  ['bcE',()=>meMail()||null,'n'],
  ['bcC',()=>V().c,'c'],
  ['ctE',()=>meMail()||null,'n'],
  ['ctC',()=>V().c,'c'],
  ['ftC',()=>V().c,'c']
].map(([id,f,k,nd])=>{const node=nd?nd():mTx(g$(id));return{node,o:node.nodeValue,f,k}});
function meMail(){
  const w=V().n.split(' ').filter(Boolean);if(!w.length)return'';
  const a=slug(w[0]),b=w.length>1?slug(w[w.length-1]):'';
  if(!a)return'';return(b?a+'.'+b:a)+'@email.com';
}
function trKeep(o){const m=o.match(/^(\s*)([\s\S]*?)(\s*)$/);return m[1]+tr(m[2])+m[3]}
function applyMe(){
  slots.forEach(s=>{const E=V(),v=E[s.k]?s.f():null;s.node.nodeValue=(v||v==='')&&E[s.k]?v:trKeep(s.o)});
  const mail=meMail()||MAIL0;
  g$('ctM').href='mailto:'+mail;
  g$('ctEc').onclick=()=>copy(mail,'Email copiado');
  document.title=(ME.n||ME.r)?[ME.n,ME.r,'Preview'].filter(Boolean).join(' | '):L(T0,'Professional virtual portfolios | Preview');
}
function meText(){
  const b=[];if(ME.n)b.push('nombre '+ME.n);if(ME.r)b.push('profesión '+ME.r);if(ME.c)b.push('ciudad '+ME.c);
  return b.join(', ');
}
function readMe(){ME.n=capWords(mClean(mn.value));ME.r=capFirst(mClean(mr.value));ME.c=capWords(mClean(mc.value))}
function setMe(o){
  ME.n=capWords(mClean(o.n));ME.r=capFirst(mClean(o.r));ME.c=capWords(mClean(o.c));
  mn.value=ME.n;mr.value=ME.r;mc.value=ME.c;
}
function saveMe(){try{if(ME.n||ME.r||ME.c)sessionStorage.setItem('pv-me',JSON.stringify(ME));else sessionStorage.removeItem('pv-me')}catch(e){}}
[mn,mr,mc].forEach(i=>{
  i.oninput=()=>{readMe();applyMe();saveMe();renderSummary()};
  i.onkeydown=e=>{if(e.key==='Enter'&&matchMedia('(max-width:700px)').matches){e.preventDefault();g$('mgo').click()}};
});
g$('mgo').onclick=()=>{openP(false);window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})};
try{const s=JSON.parse(sessionStorage.getItem('pv-me')||'null');if(s)setMe(s)}catch(e){}

// ---- Sorprendeme / Empezar de nuevo
function setPhoto(on){av.hidden=!on;document.querySelectorAll('#pf button').forEach(x=>x.setAttribute('aria-pressed',(x.dataset.p==='on')===on))}
function rndOther(list,cur){const o=list.filter(x=>x!==cur);return o[Math.floor(Math.random()*o.length)]}
let diceRot=0;
g$('sur').onclick=()=>{
  const T=[...document.querySelectorAll('#pp .sw')].map(x=>x.dataset.t);
  const F=[...document.querySelectorAll('.ft[data-f]')].map(x=>x.dataset.f);
  const B=[...document.querySelectorAll('.bgb')].map(x=>x.dataset.b);
  theme(rndOther(T,root.dataset.theme),true);
  font(rndOther(F,root.dataset.font||'base'));
  bg(rndOther(B,root.dataset.bg));
  diceRot+=180;g$('sur').querySelector('i').style.transform='rotate('+diceRot+'deg)';
};
g$('rst').onclick=()=>{
  theme('green',true);mode('dark',true);font('base');bg('grid');setPhoto(false);
  setSample('');setMe({n:'',r:'',c:''});applyMe();saveMe();renderSummary();
  try{history.replaceState(null,'',location.pathname)}catch(e){}
};

// ---- idioma del portafolio (ES / EN)
const EN=new Map(Object.entries({"NOMBRE APELLIDO": "FIRST LAST", "Inicio": "Home", "Sobre mí": "About me", "Experiencia": "Experience", "Habilidades": "Skills", "Formación": "Education", "Contacto": "Contact", "Ciudad, País · Disponible para nuevas oportunidades": "City, Country · Open to new opportunities", "Nombre": "First", "Apellido": "Last", "Profesión principal": "Main profession", "Especialidad": "Specialty", "Otro rol o servicio": "Another role or service", "Una frase breve que resume tu propuesta de valor y tu forma de trabajar.": "A short sentence that sums up your value and how you work.", "Ver experiencia": "View experience", "Contactarme": "Contact me", "Descargar CV": "Download CV", "Sobre": "About", "mí": "me", "Un título breve que muestre tu perfil profesional en una sola línea.": "A short headline that shows your professional profile in one line.", "Soy": "I am a", "con formación en tu área de estudio y experiencia en tu rubro. Acá va una presentación corta: quién sos, qué hacés y cómo ayudás a quienes trabajan con vos.": "with training in your field of study and experience in your industry. A short introduction goes here: who you are, what you do and how you help the people you work with.", "También podés sumar experiencia complementaria, tus fortalezas y el tipo de oportunidades que buscás. Un texto claro, directo y en primera persona.": "You can also add complementary experience, your strengths and the kind of opportunities you are looking for. A clear, direct text in the first person.", "Comunicación": "Communication", "Responsabilidad": "Responsibility", "Trabajo en equipo": "Teamwork", "Adaptabilidad": "Adaptability", "Certificación destacada": "Key certification", "Licencia de conducir": "Driver's license", "Valor agregado": "Added value", "Tu fortaleza principal:": "Your main strength:", "describí en una o dos líneas qué te distingue del resto.": "describe in one or two lines what sets you apart.", "Tu diferencial:": "Your edge:", "una experiencia, método o enfoque propio que aporte valor.": "an experience, method or approach of your own that adds value.", "Versatilidad y movilidad:": "Versatility and mobility:", "habilidades complementarias y disponibilidad.": "complementary skills and availability.", "Trayectoria": "Work", "laboral": "experience", "Recorrido profesional por tus áreas de trabajo.": "Your professional path across your areas of work.", "Todos": "All", "Área principal": "Main area", "Área secundaria": "Secondary area", "Complementaria": "Complementary", "Mes Año – Actualidad": "Month Year – Present", "Institución o empresa 1": "Institution or company 1", "Cargo actual": "Current position", "Breve descripción del puesto y de tus responsabilidades principales.": "Short description of the role and your main responsibilities.", "Tarea o logro destacado.": "Key task or achievement.", "Mes Año – Mes Año": "Month Year – Month Year", "Institución o empresa 2": "Institution or company 2", "Cargo o función": "Position or role", "Descripción del trabajo realizado y del rol que cumpliste en el equipo.": "Description of the work done and the role you played in the team.", "Resultado o aporte concreto.": "Concrete result or contribution.", "Otra tarea o logro relevante.": "Another relevant task or achievement.", "Año": "Year", "Institución o empresa 3": "Institution or company 3", "Descripción breve de la experiencia y de las tareas desempeñadas.": "Short description of the experience and the tasks performed.", "Año – Año": "Year – Year", "Proyecto o trabajo independiente": "Project or freelance work", "Rol desempeñado": "Role performed", "Contá de qué trató el proyecto y cuál fue tu participación.": "Tell what the project was about and what your part was.", "Mes Año": "Month Year", "Institución o empresa 4": "Institution or company 4", "Descripción breve de las tareas realizadas.": "Short description of the tasks performed.", "Experiencia previa": "Previous experience", "Institución o empresa 5": "Institution or company 5", "Experiencia complementaria": "Complementary experience", "Experiencia complementaria 1": "Complementary experience 1", "Área o rubro": "Area or industry", "Tareas que te dieron versatilidad y capacidad de trabajo en equipo.": "Tasks that gave you versatility and teamwork skills.", "Tarea o responsabilidad 1.": "Task or responsibility 1.", "Tarea o responsabilidad 2.": "Task or responsibility 2.", "Tarea o responsabilidad 3.": "Task or responsibility 3.", "Oficios y otros trabajos": "Trades and other jobs", "Experiencia complementaria 2": "Complementary experience 2", "Oficios o trabajos que te dieron adaptación y autonomía.": "Trades or jobs that gave you adaptability and autonomy.", "Habilidades &": "Skills &", "competencias": "competencies", "Lo que sabés hacer y cómo lo aplicás en cada trabajo.": "What you can do and how you apply it in each job.", "Competencias principales": "Core competencies", "Las habilidades centrales de tu profesión.": "The central skills of your profession.", "Habilidad principal 1": "Core skill 1", "Habilidad principal 2": "Core skill 2", "Habilidad principal 3": "Core skill 3", "Resolución de problemas": "Problem solving", "Complementarias": "Complementary", "Versatilidad para distintos entornos de trabajo.": "Versatility for different work environments.", "Atención al público": "Customer service", "Herramienta o software": "Tool or software", "Idioma": "Language", "Organización": "Organization", "Habilidad técnica 1": "Technical skill 1", "Habilidad técnica 2": "Technical skill 2", "Diseño gráfico": "Graphic design", "Formación &": "Education &", "certificaciones": "certifications", "Formación académica": "Academic education", "Título universitario o terciario": "University or vocational degree", "Universidad o institución": "University or institution", "Estudios secundarios": "Secondary education", "Nombre de la institución": "Name of the institution", "Completo": "Completed", "Estudios primarios": "Primary education", "Certificación o carnet": "Certification or card", "Vigente": "Valid", "Categoría": "Category", "Cursos y capacitaciones": "Courses and training", "Curso o capacitación 1": "Course or training 1", "Curso o capacitación 2": "Course or training 2", "Curso o capacitación 3": "Course or training 3", "Curso o capacitación 4": "Course or training 4", "Curso o capacitación 5": "Course or training 5", "Institución": "Institution", "Institución · Año": "Institution · Year", "Taller o seminario": "Workshop or seminar", "Hablemos y": "Let's talk and", "trabajemos": "work together", "¿Tenés un proyecto o una oportunidad en mente? Escribime.": "Got a project or an opportunity in mind? Write to me.", "Teléfono / WhatsApp": "Phone / WhatsApp", "Email": "Email", "Ubicación": "Location", "Ciudad, Provincia": "City, State", "Referencias laborales": "Work references", "Disponibles a solicitud": "Available on request", "WhatsApp": "WhatsApp", "Enviar mail": "Send email", "© 2026 \"@rebelkidfbrii\". Todos los derechos reservados.": "© 2026 \"@rebelkidfbrii\". All rights reserved.", "Ciudad, País": "City, Country", "Abrir menú": "Open menu", "Copiar teléfono": "Copy phone", "Copiar email": "Copy email", "Espacio para foto de perfil": "Profile photo space", "Acá se descarga tu currículum": "Your résumé downloads here", "Teléfono copiado": "Phone copied", "Email copiado": "Email copied", "Acá se abre WhatsApp con tu número y un mensaje ya escrito": "WhatsApp opens here with your number and a ready-made message"}));
const EN2={"Beneficios": "Benefits", "Bienvenido/a a la preview de portafolios virtuales": "Welcome to the virtual portfolio preview", "Así puede verse tu portafolio. Probá distintos colores y elegí el que más vaya con vos.": "This is how your portfolio could look. Try different colors and pick the one that suits you best.", "Probalo con tu nombre": "Try it with your name", "Se ve en vivo en la preview. Si compartís tu combinación o pedís tu portafolio, estos datos viajan en el link y en el mensaje.": "Shown live in the preview. If you share your combination or request your portfolio, these details travel in the link and in the message.", "Tu nombre": "Your name", "Tu profesión": "Your profession", "Tu ciudad": "Your city", "Ejemplo completo por rubro": "Full example by industry", "Cargá un perfil de muestra para imaginar el resultado final. Tu nombre, profesión y ciudad se ponen encima.": "Load a sample profile to picture the final result. Your name, profession and city go on top of it.", "Gastronomía": "Food & hospitality", "Salud": "Health", "Tecnología": "Technology", "Sin ejemplo": "No example", "Ver cómo queda": "See how it looks", "Sorprendeme": "Surprise me", "Empezar de nuevo": "Start over", "Vista de celular": "Phone view", "Mirá la portada como la verán tus contactos.": "See the cover page as your contacts will see it.", "Verde": "Green", "Azul": "Blue", "Violeta": "Violet", "Rojo": "Red", "Negro": "Black", "Blanco": "White", "Rosa": "Pink", "Naranja": "Orange", "Amarillo": "Yellow", "Turquesa": "Teal", "Lima": "Lime", "Modo claro u oscuro": "Light or dark mode", "Oscuro": "Dark", "Claro": "Light", "Tipografía": "Typography", "Elegante": "Elegant", "Moderna": "Modern", "Creativa": "Creative", "Técnica": "Technical", "Amigable": "Friendly", "Impacto": "Impact", "Geométrica": "Geometric", "Clásica": "Classic", "Futurista": "Futuristic", "Fondo": "Background", "Cuadrícula": "Grid", "Liso": "Plain", "Puntos": "Dots", "Ondas": "Waves", "Malla": "Mesh", "Franjas": "Stripes", "Papel": "Paper", "Foto de perfil (Paquete completo +)": "Profile photo (Complete package +)", "Sin foto": "No photo", "Con foto": "With photo", "Tu combinación": "Your combination", "Compartir mi combinación": "Share my combination", "Ver planes y precios": "See plans and prices", "Salir de la vista de celular": "Exit phone view", "¿Por qué un portafolio virtual?": "Why a virtual portfolio?", "Tu perfil profesional siempre disponible, a un link de distancia.": "Your professional profile, always available, one link away.", "Ir a los planes": "Go to the plans", "Preguntas frecuentes": "Frequently asked questions", "Beneficios de tener el tuyo": "Benefits of having your own", "Siempre disponible": "Always available", "Tu perfil online las 24 horas, para que lo vea quien quiera, cuando quiera.": "Your profile online 24/7, so anyone can see it whenever they want.", "Se comparte con un toque": "Shared with one tap", "Un link o un QR y listo: por WhatsApp, redes o mail.": "A link or a QR code and you are done: by WhatsApp, social media or email.", "Se actualiza al instante": "Updates instantly", "Nuevo trabajo o curso: se agrega sin reimprimir nada.": "New job or course: it gets added without reprinting anything.", "Muestra mucho más": "Shows much more", "Experiencia, habilidades, formación y contacto directo en un solo lugar.": "Experience, skills, education and direct contact in one place.", "Se ve bien en el celular": "Looks great on your phone", "Diseño adaptable, pensado para abrirse desde el teléfono.": "Responsive design, made to be opened from a phone.", "Con tu estilo": "In your style", "Colores y contenido a tu medida, para una imagen profesional y propia.": "Colors and content tailored to you, for a professional image of your own.", "Portafolio virtual vs. CV impreso": "Virtual portfolio vs. printed CV", "Portafolio virtual": "Virtual portfolio", "CV impreso": "Printed CV", "Alcance": "Reach", "Llega a cualquiera, en cualquier lugar": "Reaches anyone, anywhere", "Solo a quien se lo entregás": "Only the people you hand it to", "Actualización": "Updates", "En minutos, sin costo de impresión": "In minutes, with no printing cost", "Hay que reimprimir": "Has to be reprinted", "WhatsApp, mail y llamada con un toque": "WhatsApp, email and calls with one tap", "Hay que copiar los datos a mano": "Details have to be copied by hand", "Contenido": "Content", "Secciones, filtros y descarga de CV": "Sections, filters and CV download", "Una hoja con espacio limitado": "One sheet with limited space", "Durabilidad": "Durability", "No se pierde ni se arruga": "It cannot get lost or crumpled", "Se desgasta y se pierde": "It wears out and gets lost", "Imagen": "Image", "Diseño moderno y personalizado": "Modern, personalized design", "Formato fijo y común": "Fixed, generic format", "Tarjetas de presentación con QR personalizado": "Business cards with a personalized QR code", "Escaneá para ver mi portafolio": "Scan to view my portfolio", "También hacemos tarjetas con tus datos y un QR que abre tu portafolio: lo escanean y tu perfil laboral completo queda en su celular, listo para consultar cuando quieran.": "We also make cards with your details and a QR code that opens your portfolio: they scan it and your full professional profile ends up on their phone, ready whenever they want to look.", "Probá el color de la tarjeta": "Try the card color", "El QR de este ejemplo es ilustrativo y no abre ningún sitio.": "The QR code in this example is for illustration only and does not open any site.", "Cómo funciona": "How it works", "Me contás sobre vos": "Tell me about yourself", "Me pasás tu CV o tus datos: experiencia, estudios y habilidades. Sumás la foto si tu plan la incluye y los colores que te gusten.": "You send me your CV or your details: experience, studies and skills. You add a photo if your plan includes it, and the colors you like.", "Lo hacés en unos 10 minutos": "Takes about 10 minutes", "Armo tu borrador": "I build your draft", "Cargo todo en el diseño y te muestro cómo queda tu portafolio para que lo revises.": "I load everything into the design and show you how your portfolio looks so you can review it.", "1 a 3 días": "1 to 3 days", "Ajustamos los detalles": "We fine-tune the details", "Me pedís los cambios que necesites: textos, colores u orden de las secciones. Tenés 20 días hábiles para pedirlos.": "You ask for the changes you need: texts, colors or section order. You have 20 business days to request them.", "Según los cambios": "Depends on the changes", "Lo recibís y lo compartís": "You receive it and share it", "Te entrego el link de tu portafolio, y la tarjeta con QR si elegiste el Paquete completo +. Listo para mandar por WhatsApp o redes.": "I hand you the link to your portfolio, plus the QR card if you chose the Complete package +. Ready to send by WhatsApp or social media.", "El mismo día de la aprobación": "The same day you approve it", "¿Qué necesito para empezar?": "What do I need to get started?", "¿Cuánto tarda en estar listo?": "How long does it take?", "¿Puedo pedir cambios?": "Can I request changes?", "¿Qué pasa después de que me lo entregan?": "What happens after it is delivered?", "¿Qué diferencia hay entre los dos paquetes?": "What is the difference between the two packages?", "¿Cómo lo comparto?": "How do I share it?", "¿Se ve bien en el celular?": "Does it look good on a phone?", "¿Puedo probar cómo queda antes de pedirlo?": "Can I try it out before ordering?", "¿Qué pasa con mis datos?": "What happens with my data?", "¿Cómo hago el pedido y el pago?": "How do I place the order and pay?", "Elegí tu plan": "Choose your plan", "Comparación de los paquetes": "Package comparison", "Paquete completo": "Complete package", "Paquete completo +": "Complete package +", "Colores": "Colors", "3 (verde, azul y violeta)": "3 (green, blue and violet)", "11 (los 3 anteriores y 8 más)": "11 (the 3 above plus 8 more)", "Modo claro y oscuro": "Light and dark mode", "En los 3 colores": "In the 3 colors", "En todos los colores": "In every color", "Tipografías": "Typefaces", "Fondos": "Backgrounds", "Sí": "Yes", "Foto de perfil": "Profile photo", "Tarjeta con QR personalizado": "Card with personalized QR", "Precio": "Price", "Tu combinación en la preview": "Your combination in the preview", "Recomendado para tu combinación": "Recommended for your combination", "Portafolio virtual como esta preview": "Virtual portfolio like this preview", "3 colores a elección (verde, azul y violeta), cada uno en modo claro y oscuro": "3 colors of your choice (green, blue and violet), each in light and dark mode", "3 fondos a elección (cuadrícula, aurora y liso)": "3 backgrounds of your choice (grid, aurora and plain)", "3 tipografías a elección (base, Elegante y Moderna)": "3 typefaces of your choice (Base, Elegant and Modern)", "Contacto por WhatsApp y mail": "Contact by WhatsApp and email", "Sin foto de perfil": "No profile photo", "Sin tarjeta de presentación con QR": "No business card with QR code", "Elegir este plan": "Choose this plan", "11% OFF en tu primera compra": "11% OFF your first purchase", "Todo lo del paquete completo": "Everything in the Complete package", "8 colores más: rojo, negro, blanco, rosa, naranja, amarillo, turquesa y lima (11 en total)": "8 more colors: red, black, white, pink, orange, yellow, teal and lime (11 in total)", "Foto de perfil a elección": "Profile photo of your choice", "Los 11 fondos a elección": "All 11 backgrounds of your choice", "Modo claro y oscuro en todos los colores y las 11 tipografías a elección": "Light and dark mode in every color, and all 11 typefaces of your choice", "Tarjeta de presentación con QR personalizado": "Business card with a personalized QR code", "Quiero el mío": "I want mine", "Escribir por WhatsApp": "Message me on WhatsApp", "Pedí tu portafolio virtual": "Request your virtual portfolio", "Dejame tus datos y te respondo por mail para coordinar.": "Leave me your details and I will reply by email to coordinate.", "form::Nombre": "Name", "Plan de interés": "Plan of interest", "Quiero consultar": "I just want to ask a question", "Paquete completo ($15.000 ARS)": "Complete package ($15,000 ARS)", "Paquete completo + ($19.500 ARS)": "Complete package + ($19,500 ARS)", "Mensaje": "Message", "Enviar mensaje": "Send message", "Cerrar": "Close", "Preview de portafolios virtuales": "Virtual portfolio preview", "Verde (base)": "Green (base)", "Ej: Lucía Fernández": "E.g. Lucía Fernández", "Ej: Diseñadora gráfica": "E.g. Graphic designer", "Ej: Rosario, Santa Fe": "E.g. Rosario, Santa Fe", "Vista de celular de tu portafolio": "Phone view of your portfolio", "Link de tu combinación copiado": "Your combination link was copied", "Cargamos la combinación del link": "We loaded the combination from the link"};
Object.entries(EN2).forEach(([k,v])=>EN.set(k,v));
Object.entries({"¿Querés enterarte de las novedades del proyecto? Estamos en la versión 1.11.":"Want to hear about project updates? We are on version 1.11.","Avisame":"Notify me","Tu email":"Your email","tu@email.com":"you@email.com"}).forEach(([k,v])=>EN.set(k,v));
EN.set('Ciudad, País','City, Country');EN.set('· Disponible para nuevas oportunidades','· Open to new opportunities');EN.set('Nombre Apellido','First Last');
function tr(s){return LANG==='en'&&EN.has(s)?EN.get(s):s}
const origTx=new Map(),origAt=new Map(),origHtml=new Map();
const TRSEL='#fabs,#pp,#bp,#cf,#ph,header,main,footer';
const DYN='#ch,#mh,#th,#bh,#sp,#n1,#n2,#sc,#sc2,#cm,#nlm,#toast,#p1,#p2,#po,#t1,#t2,#plan option[value^="Paquete"]';
const SKIPSEL='[data-en],'+DYN;
const ATTRS=['aria-label','placeholder','title'];
function setLang(l){
  LANG=l;document.documentElement.lang=l;
  document.querySelectorAll(TRSEL).forEach(el=>{
    el.lang=l;
    el.querySelectorAll('[data-en]').forEach(e=>{
      if(!origHtml.has(e))origHtml.set(e,e.innerHTML);
      e.innerHTML=l==='en'?e.dataset.en:origHtml.get(e);
    });
    const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;return(!p||p.closest(SKIPSEL))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});
    let n;
    while(n=w.nextNode()){
      if(!origTx.has(n))origTx.set(n,n.nodeValue);
      const o=origTx.get(n),m=o.match(/^(\s*)([\s\S]*?)(\s*)$/),c=n.parentElement.dataset.c;
      let v;if(l==='en'){v=c&&EN.get(c+'::'+m[2]);if(v==null)v=EN.get(m[2])}
      n.nodeValue=v!=null?m[1]+v+m[3]:o;
    }
    [el,...el.querySelectorAll('[aria-label],[placeholder],[title]')].forEach(a=>{
      if(a.tagName==='IFRAME')return;
      ATTRS.forEach(at=>{
        if(!a.hasAttribute(at))return;
        let rec=origAt.get(a);if(!rec){rec={};origAt.set(a,rec)}
        if(!(at in rec))rec[at]=a.getAttribute(at);
        const o=rec[at];a.setAttribute(at,l==='en'&&EN.has(o)?EN.get(o):o);
      });
    });
  });
  document.querySelectorAll('#lg span[data-l]').forEach(x=>x.classList.toggle('on',x.dataset.l===l));
  if(phoneFrame)phoneFrame.title=L('Vista de celular de tu portafolio','Phone view of your portfolio');
  if(SMP)exApply();
  applyMe();
  applyCur();
  hints();
  if(!EMB)try{localStorage.setItem('pv-lang',l)}catch(e){}
  try{renderSummary()}catch(e){}
}
document.getElementById('lg').onclick=()=>setLang(LANG==='es'?'en':'es');
let sl;try{sl=localStorage.getItem('pv-lang')}catch(e){}
if(sl==='en')setLang('en');
// ---- botón de WhatsApp de la demo: muestra el aviso en lugar de abrir un número
document.getElementById('cwa').onclick=e=>{e.preventDefault();toast('Acá se abre WhatsApp con tu número y un mensaje ya escrito','fa-circle-check')};
// ---- aparición al hacer scroll
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  const sel='.hero .wrap>*,.sh,main .card,.chip';
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll(sel).forEach(el=>{
    const sib=[...el.parentElement.children].filter(x=>x.matches(sel));
    el.style.setProperty('--d',Math.min(sib.indexOf(el),5)*70+'ms');
    el.classList.add('rv');io.observe(el);
  });
}

// ---- resumen de la combinación, plan recomendado y link para compartir
const nmTx=b=>[...b.childNodes].filter(n=>n.nodeType===3).map(n=>n.nodeValue).join('').trim();
const esT=n=>(origTx.has(n)?origTx.get(n):n.nodeValue).trim();
const nmTxE=b=>[...b.childNodes].filter(n=>n.nodeType===3).map(esT).join(' ').trim();
function combo(){return{t:root.dataset.theme,m:root.dataset.mode,f:root.dataset.font||'base',b:root.dataset.bg,p:!av.hidden}}
function comboInfo(){
  const c=combo(),en=LANG==='en';
  const cb=document.querySelector('#pp .sw[data-t="'+c.t+'"]'),col=nmTx(cb),colE=nmTxE(cb),colPlus=cb.dataset.p==='1';
  const fb=document.querySelector('.ft[data-f="'+c.f+'"]'),fsp=fb.querySelector('span'),ft=fsp.textContent.trim(),ftE=esT(fsp.firstChild),ftPlus=fb.dataset.p==='1';
  const bb=document.querySelector('.bgb[data-b="'+c.b+'"]');
  const bgn=nmTx(bb),bgE=nmTxE(bb),bgPlus=bb.dataset.p==='1';
  const nat=c.t==='white'?'light':'dark';
  const modePlus=colPlus&&c.m!==nat;
  const modeN=c.m==='light'?L('Claro','Light'):L('Oscuro','Dark'),modeE=c.m==='light'?'Claro':'Oscuro';
  const chips=[{x:'Color '+col,up:colPlus},{x:L('Modo ','Mode ')+modeN,up:modePlus},{x:L('Fondo ','Background ')+bgn,up:bgPlus},{x:L('Tipografía ','Typography ')+ft,up:ftPlus},{x:c.p?L('Con foto','With photo'):L('Sin foto','No photo'),up:c.p}];
  const plus=[];
  if(colPlus)plus.push('color '+col.toLowerCase());
  if(modePlus)plus.push(en?modeN.toLowerCase()+' mode in '+col.toLowerCase():'modo '+modeN.toLowerCase()+' en '+col.toLowerCase());
  if(bgPlus)plus.push(L('fondo ','background ')+bgn);
  if(ftPlus)plus.push(L('tipografía ','typography ')+ft.toLowerCase());
  if(c.p)plus.push(L('foto de perfil','profile photo'));
  const def=c.t==='green'&&c.m==='dark'&&c.f==='base'&&c.b==='grid'&&!c.p;
  // el texto para el mensaje al dueño va siempre en español
  const text='color '+colE+' (modo '+modeE.toLowerCase()+'), fondo '+bgE+', tipografía '+ftE.toLowerCase()+', '+(c.p?'con':'sin')+' foto de perfil';
  return{c,chips,plus,def,text,me:meText(),ex:SMP?EJ[SMP].lb:''};
}
function shareURL(){
  const c=combo(),q=new URLSearchParams();
  q.set('t',c.t);q.set('m',c.m);if(c.f!=='base')q.set('f',c.f);q.set('b',c.b);if(c.p)q.set('p','1');if(SMP)q.set('e',SMP);if(ME.n)q.set('n',ME.n);if(ME.r)q.set('r',ME.r);if(ME.c)q.set('c',ME.c);if(LANG==='en')q.set('l','en');if(CUR==='USD')q.set('cur','usd');
  const cn=document.querySelector('link[rel=canonical]');
  const base=/^https?:/.test(location.href)?location.href.split(/[?#]/)[0]:(cn?cn.href:location.href.split(/[?#]/)[0]);
  return base+'?'+q.toString();
}
function renderSummary(){
  const i=comboInfo();
  const h=i.chips.map(k=>'<span'+(k.up?' class="up"':'')+'>'+k.x+'</span>').join('');
  document.getElementById('sc').innerHTML=h;document.getElementById('sc2').innerHTML=h;
  const need=i.plus.length>0;
  document.getElementById('sp').innerHTML=need?L('Usa elementos del <b>Paquete completo +</b> (los marcados con +).','Uses elements from the <b>Complete package +</b> (the ones marked with +).'):L('Incluida en el <b>Paquete completo</b>.','Included in the <b>Complete package</b>.');
  const n1=document.getElementById('n1'),n2=document.getElementById('n2'),pk=document.querySelectorAll('.pk');
  if(need){n1.className='nt wn';n1.textContent=L('Tu combinación usa: ','Your combination uses: ')+i.plus.join(', ')+L('. Eso es del Paquete completo +.','. That is part of the Complete package +.')}
  else{n1.className='nt ok';n1.textContent=L('Incluye tu combinación actual.','Includes your current combination.')}
  n2.className='nt ok';n2.textContent=L('Incluye todo lo que elegiste.','Includes everything you chose.');
  pk[0].classList.toggle('rec',!need&&!i.def);pk[1].classList.toggle('rec',need);
  const bits=[];if(!i.def)bits.push('Mi combinación: '+i.text+'.');if(i.me)bits.push('Mis datos: '+i.me+'.');if(i.ex)bits.push('Rubro de ejemplo: '+i.ex+'.');
  const msg='Hola! Vi la preview de portafolios virtuales y quiero el mío.'+(bits.length?' '+bits.join(' ')+' '+shareURL():'');
  document.getElementById('wa').href='https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(msg);
  syncPhone();
}
const moS=new MutationObserver(renderSummary);
moS.observe(root,{attributes:true,attributeFilter:['data-theme','data-mode','data-font','data-bg']});
moS.observe(av,{attributes:true,attributeFilter:['hidden']});
let lastAuto='';
function openForm(plan){
  const i=comboInfo(),m=cform.elements.message,sel=document.getElementById('plan');
  if(plan)sel.value=plan;else if(!i.def)sel.value=i.plus.length?'Paquete completo +':'Paquete completo';
  const ab=[];if(!i.def)ab.push('Esta es mi combinación de la preview: '+i.text+'.');if(i.me)ab.push('Mis datos: '+i.me+'.');if(i.ex)ab.push('Rubro de ejemplo: '+i.ex+'.');
  const auto=ab.length?'Hola! '+ab.join(' '):'';
  if(m.value.trim()===''||m.value===lastAuto){m.value=auto;lastAuto=auto}
  document.getElementById('cl').value=(i.def&&!i.me&&!i.ex)?'':shareURL();
  cf.showModal();
}
async function shareCombo(){
  const u=shareURL();
  if(navigator.share){
    try{await navigator.share({title:L('Mi portafolio virtual','My virtual portfolio'),text:L('Mirá la combinación que elegí para mi portafolio virtual:','Check out the combination I picked for my virtual portfolio:'),url:u});return}
    catch(e){if(e&&e.name==='AbortError')return}
  }
  copy(u,'Link de tu combinación copiado');
}
document.getElementById('sh').onclick=shareCombo;
// ---- ejemplo completo por rubro (perfiles de muestra, en español)
const EJ={
gastro:{lb:'Gastronomía',n:'Martina Quiroga',r:'Cocinera profesional',c:'Mendoza, Argentina',
ro:['Cocina de autor','Gestión de equipos'],sl:'Cocina con identidad: sabor, orden y trabajo en equipo en cada servicio.',
ah:'Cocinera con 8 años de experiencia en restaurantes, hoteles y eventos.',
a1:' con formación terciaria en gastronomía. Trabajé en cocinas de alto volumen, armé cartas de temporada y coordiné equipos de hasta 12 personas.',
a2:'Busco sumarme a un proyecto gastronómico donde pueda aportar creatividad, orden y buen clima de trabajo.',
ch:['Cocina caliente','Pastelería','Costos y stock','Liderazgo','Manipulación de alimentos','Licencia de conducir'],
hl:[['Producto local:','platos de autor con ingredientes de la región.'],['Orden en servicio:','organización de la partida y control de tiempos.'],['Disponibilidad:','horarios rotativos, fines de semana y temporada alta.']],
fl:['Cocina','Salón y barra','Eventos'],
ex:[['a','2022 – Actualidad','Restaurante Raíz','Jefa de partida','Coordino la cocina caliente y el pase en un salón de 80 cubiertos.',['Carta de temporada con producto local.','Menos desperdicio gracias al control de stock.']],
['a','2019 – 2022','Hotel Andes','Cocinera','Desayunos, banquetes y servicio a la carta.',['Servicio para eventos de hasta 200 personas.']],
['b','2018 – 2019','Bar Malbec','Barista y servicio de barra','Atención de barra y salón en horarios pico.',['Café de especialidad y coctelería básica.']],
['b','2017 – 2018','Café Plaza','Ayudante de cocina','Mise en place y pastelería diaria.',[]],
['c','Temporada 2024','Catering Sabores','Cocinera de eventos','Producción de menús para casamientos y eventos corporativos.',['Trabajo en equipo bajo presión.','Logística y armado en el lugar.']]],
tg:[['Cocina caliente','Pastelería','Mise en place','Costos y stock','Armado de cartas','Trabajo bajo presión'],['Atención al público','Barista','Coctelería básica','Inglés básico','Planilla de stock','Organización']],
ed:[['Tecnicatura en Gastronomía','Instituto Cuyo','2018'],['Bachiller en Economía','Escuela Nº 4-012','Completo'],['Estudios primarios','Escuela Nº 1-345','Completo']],
ce:[['Carnet de manipulación de alimentos','Vigente'],['Licencia de conducir','Categoría B1']],
cu:[['Cocina de autor','Escuela de Cocineros'],['Pastelería profesional','Instituto Cuyo'],['Costos gastronómicos','Cámara de Turismo'],['Inglés para el servicio','Centro de Idiomas · 2023']]},
salud:{lb:'Salud',n:'Camila Sosa',r:'Kinesióloga',c:'Rosario, Argentina',
ro:['Rehabilitación deportiva','Atención domiciliaria'],sl:'Acompaño a cada paciente con un plan claro para recuperar movimiento y bienestar.',
ah:'Kinesióloga con 6 años de experiencia en rehabilitación y atención domiciliaria.',
a1:' graduada de la Universidad Nacional de Rosario. Trabajo con pacientes de todas las edades, combinando ejercicio terapéutico, educación y seguimiento personalizado.',
a2:'Busco sumar mi experiencia a un centro de salud o equipo interdisciplinario que priorice la atención cercana.',
ch:['Trato con pacientes','Empatía','Trabajo interdisciplinario','Historia clínica','Primeros auxilios','Licencia de conducir'],
hl:[['Plan a medida:','objetivos claros y seguimiento de cada etapa.'],['Enfoque deportivo:','recuperación de lesiones y prevención.'],['Movilidad:','atención en consultorio y a domicilio.']],
fl:['Clínica','Domiciliaria','Deporte'],
ex:[['a','2021 – Actualidad','Centro Kinésico Litoral','Kinesióloga','Rehabilitación traumatológica y deportiva en consultorio.',['Más de 40 pacientes por mes.','Planes de ejercicio terapéutico a medida.']],
['a','2019 – 2021','Clínica Del Parque','Kinesióloga de guardia','Atención de pacientes internados y ambulatorios.',['Trabajo junto a traumatólogos y enfermería.']],
['b','2020 – Actualidad','Atención domiciliaria','Kinesióloga independiente','Sesiones a domicilio para adultos mayores y posoperatorios.',['Seguimiento y registro de la evolución.']],
['b','2019','Obra social Salud Sur','Prestadora','Atención de afiliados con derivación médica.',[]],
['c','2018 – 2019','Club Atlético Rosario','Kinesióloga de juveniles','Prevención de lesiones y recuperación de deportistas.',['Entrenamiento de movilidad y fuerza.','Charlas de prevención para entrenadores.']]],
tg:[['Evaluación funcional','Ejercicio terapéutico','Rehabilitación deportiva','Terapia manual','Seguimiento de pacientes','Educación al paciente'],['Historia clínica','Trabajo en equipo','Atención domiciliaria','Primeros auxilios','Paquete Office','Organización']],
ed:[['Licenciatura en Kinesiología','Universidad Nacional de Rosario','2018'],['Bachiller en Ciencias Naturales','Escuela Nº 3-210','Completo'],['Estudios primarios','Escuela Nº 1-120','Completo']],
ce:[['Matrícula profesional','Vigente'],['Licencia de conducir','Categoría B1']],
cu:[['RCP y primeros auxilios','Cruz Roja'],['Rehabilitación deportiva','Colegio de Kinesiólogos'],['Kinesiología respiratoria','Hospital Provincial'],['Ejercicio terapéutico','Universidad Nacional · 2023']]},
tech:{lb:'Tecnología',n:'Nicolás Paz',r:'Desarrollador web',c:'Buenos Aires, Argentina',
ro:['Frontend y diseño web','Proyectos freelance'],sl:'Construyo sitios rápidos, claros y fáciles de mantener para negocios y marcas personales.',
ah:'Desarrollador web con 5 años creando sitios y aplicaciones para clientes de distintos rubros.',
a1:' con base en frontend y experiencia en proyectos freelance y de equipo. Cuido el diseño, la velocidad y la experiencia de uso en el celular.',
a2:'Busco un equipo de producto donde seguir creciendo y aportar código limpio y buena comunicación.',
ch:['JavaScript','HTML y CSS','Diseño responsive','Git y GitHub','Resolución de problemas','Inglés técnico'],
hl:[['Entrega prolija:','código claro, documentado y fácil de mantener.'],['Foco en el usuario:','sitios rápidos que se ven bien en el celular.'],['Autonomía:','trabajo remoto con buena comunicación.']],
fl:['Empresa','Freelance','Soporte'],
ex:[['a','2023 – Actualidad','Estudio Pixel','Desarrollador frontend','Sitios y tiendas online para los clientes del estudio.',['Mejoras de velocidad de carga en sitios existentes.','Trabajo en equipo con diseño y producto.']],
['a','2021 – 2023','Startup Nube','Desarrollador web junior','Mantenimiento de una plataforma web y nuevas funciones.',['Integración con APIs de pago.']],
['b','2020 – Actualidad','Proyectos independientes','Desarrollador freelance','Portafolios, landings y sistemas a medida para pequeños negocios.',['Más de 20 sitios entregados.']],
['b','2020','Agencia Norte','Pasante de desarrollo','Maquetado y correcciones en sitios de clientes.',[]],
['c','2019 – 2020','Soporte técnico','Técnico de soporte','Atención de consultas y resolución de problemas de usuarios.',['Documentación de soluciones frecuentes.','Comunicación clara con personas no técnicas.']]],
tg:[['JavaScript','HTML y CSS','React','Node.js','Git y GitHub','APIs REST'],['Diseño responsive','Figma','SEO básico','Inglés técnico','Metodologías ágiles','Comunicación']],
ed:[['Tecnicatura en Desarrollo de Software','Instituto Politécnico','2021'],['Bachiller en Informática','Escuela Técnica Nº 7','Completo'],['Estudios primarios','Escuela Nº 12','Completo']],
ce:[['Certificación en JavaScript','Vigente'],['Licencia de conducir','Categoría B1']],
cu:[['React desde cero','Plataforma online'],['Diseño UX/UI','Escuela de Diseño'],['Git y trabajo en equipo','Bootcamp Code'],['Inglés técnico','Instituto de Idiomas · 2024']]}
};
const EJEN={
gastro:{lb:'Food & hospitality',n:'Martina Quiroga',r:'Professional cook',c:'Mendoza, Argentina',
ro:['Signature cuisine','Team management'],sl:'Cuisine with identity: flavor, order and teamwork in every service.',
ah:'Cook with 8 years of experience in restaurants, hotels and events.',
a1:' with vocational training in gastronomy. I worked in high-volume kitchens, built seasonal menus and coordinated teams of up to 12 people.',
a2:'I am looking to join a food project where I can contribute creativity, organization and a good work atmosphere.',
ch:['Hot kitchen','Pastry','Costs and inventory','Leadership','Food handling',"Driver's license"],
hl:[['Local produce:','signature dishes with regional ingredients.'],['Order in service:','station organization and timing control.'],['Availability:','rotating shifts, weekends and high season.']],
fl:['Kitchen','Dining room and bar','Events'],
ex:[['a','2022 – Present','Raíz Restaurant','Station chief','I run the hot kitchen and the pass in an 80-seat dining room.',['Seasonal menu with local produce.','Less waste thanks to inventory control.']],
['a','2019 – 2022','Hotel Andes','Cook','Breakfasts, banquets and à la carte service.',['Service for events of up to 200 people.']],
['b','2018 – 2019','Bar Malbec','Barista and bar service','Bar and dining room service during peak hours.',['Specialty coffee and basic cocktails.']],
['b','2017 – 2018','Café Plaza','Kitchen assistant','Mise en place and daily pastry.',[]],
['c','2024 season','Sabores Catering','Event cook','Menu production for weddings and corporate events.',['Teamwork under pressure.','On-site logistics and setup.']]],
tg:[['Hot kitchen','Pastry','Mise en place','Costs and inventory','Menu building','Working under pressure'],['Customer service','Barista','Basic cocktails','Basic English','Inventory sheet','Organization']],
ed:[['Vocational degree in Gastronomy','Instituto Cuyo','2018'],['High school diploma in Economics','School No. 4-012','Completed'],['Primary education','School No. 1-345','Completed']],
ce:[['Food handler card','Valid'],["Driver's license",'Category B1']],
cu:[['Signature cuisine',"Cooks' School"],['Professional pastry','Instituto Cuyo'],['Food service costing','Chamber of Tourism'],['English for service','Language Center · 2023']]},
salud:{lb:'Health',n:'Camila Sosa',r:'Physical therapist',c:'Rosario, Argentina',
ro:['Sports rehabilitation','Home care'],sl:'I support each patient with a clear plan to regain movement and well-being.',
ah:'Physical therapist with 6 years of experience in rehabilitation and home care.',
a1:' graduated from the National University of Rosario. I work with patients of all ages, combining therapeutic exercise, education and personalized follow-up.',
a2:'I am looking to bring my experience to a health center or interdisciplinary team that prioritizes close, personal care.',
ch:['Patient care','Empathy','Interdisciplinary work','Medical records','First aid',"Driver's license"],
hl:[['Tailored plan:','clear goals and follow-up at every stage.'],['Sports focus:','injury recovery and prevention.'],['Mobility:','care at the clinic and at home.']],
fl:['Clinic','Home care','Sports'],
ex:[['a','2021 – Present','Litoral Physical Therapy Center','Physical therapist','Orthopedic and sports rehabilitation at the clinic.',['Over 40 patients per month.','Tailored therapeutic exercise plans.']],
['a','2019 – 2021','Del Parque Clinic','On-call physical therapist','Care for inpatients and outpatients.',['Worked alongside orthopedic surgeons and nursing staff.']],
['b','2020 – Present','Home care','Independent physical therapist','Home sessions for older adults and post-surgery patients.',['Follow-up and progress records.']],
['b','2019','Salud Sur health plan','Provider','Care for members with a medical referral.',[]],
['c','2018 – 2019','Club Atlético Rosario','Youth team physical therapist','Injury prevention and athlete recovery.',['Mobility and strength training.','Prevention talks for coaches.']]],
tg:[['Functional assessment','Therapeutic exercise','Sports rehabilitation','Manual therapy','Patient follow-up','Patient education'],['Medical records','Teamwork','Home care','First aid','Office suite','Organization']],
ed:[['Degree in Physical Therapy','National University of Rosario','2018'],['High school diploma in Natural Sciences','School No. 3-210','Completed'],['Primary education','School No. 1-120','Completed']],
ce:[['Professional license','Valid'],["Driver's license",'Category B1']],
cu:[['CPR and first aid','Red Cross'],['Sports rehabilitation','College of Physical Therapists'],['Respiratory physiotherapy','Provincial Hospital'],['Therapeutic exercise','National University · 2023']]},
tech:{lb:'Technology',n:'Nicolás Paz',r:'Web developer',c:'Buenos Aires, Argentina',
ro:['Frontend and web design','Freelance projects'],sl:'I build fast, clear and easy-to-maintain sites for businesses and personal brands.',
ah:'Web developer with 5 years building sites and applications for clients in different industries.',
a1:' with a frontend background and experience in freelance and team projects. I care about design, speed and the mobile experience.',
a2:'I am looking for a product team where I can keep growing and contribute clean code and good communication.',
ch:['JavaScript','HTML and CSS','Responsive design','Git and GitHub','Problem solving','Technical English'],
hl:[['Clean delivery:','clear, documented, easy-to-maintain code.'],['User focus:','fast sites that look great on a phone.'],['Autonomy:','remote work with good communication.']],
fl:['Company','Freelance','Support'],
ex:[['a','2023 – Present','Pixel Studio','Frontend developer',"Websites and online stores for the studio's clients.",['Loading speed improvements on existing sites.','Teamwork with design and product.']],
['a','2021 – 2023','Nube Startup','Junior web developer','Maintenance of a web platform and new features.',['Integration with payment APIs.']],
['b','2020 – Present','Independent projects','Freelance developer','Portfolios, landing pages and custom systems for small businesses.',['Over 20 sites delivered.']],
['b','2020','Norte Agency','Development intern','Layout work and fixes on client sites.',[]],
['c','2019 – 2020','Technical support','Support technician','Handling inquiries and solving user problems.',['Documentation of common solutions.','Clear communication with non-technical people.']]],
tg:[['JavaScript','HTML and CSS','React','Node.js','Git and GitHub','REST APIs'],['Responsive design','Figma','Basic SEO','Technical English','Agile methodologies','Communication']],
ed:[['Vocational degree in Software Development','Polytechnic Institute','2021'],['High school diploma in Computer Science','Technical School No. 7','Completed'],['Primary education','School No. 12','Completed']],
ce:[['JavaScript certification','Valid'],["Driver's license",'Category B1']],
cu:[['React from scratch','Online platform'],['UX/UI design','Design School'],['Git and teamwork','Code Bootcamp'],['Technical English','Language Institute · 2024']]}
};
function exPersona(){return (LANG==='en'?EJEN:EJ)[SMP]}
function setT(el,v){
  let n=[...el.childNodes].filter(x=>x.nodeType===3).pop();
  if(!n){n=document.createTextNode('');el.appendChild(n)}
  if(!origTx.has(n))origTx.set(n,n.nodeValue);
  n.nodeValue=v;
}
function exApply(){
  const E=(LANG==='en'?EJEN:EJ)[SMP],Q=s=>[...document.querySelectorAll(s)];
  if(!EXT)EXT=[...document.querySelector('.about p').childNodes].filter(n=>n.nodeType===3).pop();
  const rs=Q('.roles span');setT(rs[1],E.ro[0]);setT(rs[2],E.ro[1]);
  setT(document.querySelector('.slogan'),E.sl);setT(document.querySelector('.about h3'),E.ah);
  if(!origTx.has(EXT))origTx.set(EXT,EXT.nodeValue);EXT.nodeValue=E.a1;
  setT(Q('.about p')[1],E.a2);
  Q('.chip').forEach((c,i)=>E.ch[i]&&setT(c,E.ch[i]));
  Q('.hl li').forEach((li,i)=>{const h=E.hl[i];if(h){li.querySelector('strong').textContent=h[0];setT(li.querySelector('span'),' '+h[1])}});
  Q('.f:not([data-f=all])').forEach((f,i)=>setT(f,E.fl[i]));
  const ic=['building','briefcase','user-tie','diagram-project','concierge-bell'];
  document.getElementById('exp').innerHTML=E.ex.map((x,i)=>'<article class="card exp '+(x[0]==='c'?'cat-c wide':'cat-'+x[0])+'"><div class="top"><span class="date">'+x[1]+'</span><i class="fas fa-'+ic[i%5]+'"></i></div><h3>'+x[2]+'</h3><p class="role">'+x[3]+'</p><p>'+x[4]+'</p>'+(x[5].length?'<ul>'+x[5].map(l=>'<li>'+l+'</li>').join('')+'</ul>':'')+'</article>').join('');
  const f=document.querySelector('.f[data-f=all]');if(f)f.click();
  Q('.sk .tags').forEach((t,i)=>t.innerHTML=E.tg[i].map(x=>'<span>'+x+'</span>').join(''));
  Q('.edu .eh').forEach((e,i)=>{setT(e.querySelector('h4'),E.ed[i][0]);setT(e.querySelector('em'),E.ed[i][1]);setT(e.querySelector('.yr'),E.ed[i][2])});
  Q('.edu>div:first-child .mini').forEach((m,i)=>{setT(m.querySelector('h5'),E.ce[i][0]);setT(m.querySelector('p'),E.ce[i][1])});
  const ci=['pen-ruler','laptop-code','language','chart-line'];
  document.querySelector('.edu>div:nth-child(2)>.card').innerHTML=E.cu.map((c,i)=>'<div class="mini"><i class="fas fa-'+ci[i]+'"></i><div><h5>'+c[0]+'</h5><p>'+c[1]+'</p></div></div>').join('');
}
function exClear(){
  if(!EXS)return;
  EXS.forEach(([el,h])=>{el.innerHTML=h;el.querySelectorAll('.rv').forEach(x=>x.classList.remove('rv','in'))});
  const o=origTx.get(EXT);if(o!=null)EXT.nodeValue=o;
  const f=document.querySelector('.f[data-f=all]');if(f)f.click();
  if(LANG==='en')setLang('en');
}
function setSample(id){
  const had=!!SMP;
  SMP=Object.prototype.hasOwnProperty.call(EJ,id)?id:null;
  document.querySelectorAll('#ex button[data-e]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.e===(SMP||'')));
  if(SMP)exApply();else if(had)exClear();
  applyMe();
  try{if(SMP)sessionStorage.setItem('pv-ex',SMP);else sessionStorage.removeItem('pv-ex')}catch(e){}
  try{renderSummary()}catch(e){}
}
document.querySelectorAll('#ex button[data-e]').forEach(b=>b.onclick=()=>setSample(b.dataset.e));
try{const x=sessionStorage.getItem('pv-ex');if(x)setSample(x)}catch(e){}

// ---- cargar la combinación desde el link (?t=…&m=…&f=…&b=…&p=1&n=…&r=…&c=…&l=en)
(function(){
  let q;try{q=new URLSearchParams(location.search)}catch(e){return}
  const has=(sel,a,v)=>v&&[...document.querySelectorAll(sel)].some(x=>x.dataset[a]===v);
  const t=q.get('t'),m=q.get('m'),f=q.get('f'),b=q.get('b');let any=false;
  if(has('#pp .sw','t',t)){theme(t,false);any=true}
  if(m==='dark'||m==='light'){mode(m,false);any=true}
  if(has('.ft[data-f]','f',f)){font(f);any=true}
  if(has('.bgb','b',b)){bg(b);any=true}
  if(q.get('p')==='1'){av.hidden=false;document.querySelectorAll('#pf button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.p==='on'));any=true}
  const le=q.get('e');if(le&&Object.prototype.hasOwnProperty.call(EJ,le)){setSample(le);any=true}
  const ln=q.get('n'),lr=q.get('r'),lc=q.get('c');
  if(ln||lr||lc){setMe({n:ln,r:lr,c:lc});applyMe();saveMe();any=true}
  if(q.get('l')==='en')setLang('en');
  if((q.get('cur')||'').toLowerCase()==='usd')setCur('USD',true);
  if(any)setTimeout(()=>toast('Cargamos la combinación del link','fa-link'),900);
})();

// ---- estadísticas simples y sin cookies (GoatCounter)
// Pegá acá tu código de GoatCounter (el de https://CODIGO.goatcounter.com). Vacío = no se mide nada.
const GC_CODE='rebelkidfbrii';
function track(path,title,ev){
  if(!GC_CODE||EMB||navigator.doNotTrack==='1'||!/^https?:$/.test(location.protocol)||/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname))return;
  try{
    const q=new URLSearchParams({p:path,t:title||path});
    if(ev)q.set('e','1');
    else if(document.referrer&&document.referrer.indexOf(location.origin)!==0)q.set('r',document.referrer);
    q.set('s',[screen.width,screen.height,window.devicePixelRatio||1].join(','));
    q.set('rnd',Math.random().toString(36).slice(2,8));
    new Image().src='https://'+GC_CODE+'.goatcounter.com/count?'+q.toString();
  }catch(e){}
}
function comboKey(){const c=combo();return c.t+'-'+c.m+'-'+c.f+'-'+c.b+(c.p?'-foto':'')}
// Solo se registran elecciones hechas con un clic (no las que llegan por link ni el sorteo); nunca se envían nombre, profesión ni ciudad.
document.addEventListener('click',e=>{
  const t=e.target.closest?e.target:null;if(!t)return;
  const b=t.closest('#pp .sw,#cs .sw,.ft[data-f],.bgb,#md button[data-m],#pf button[data-p],#ex button[data-e]');
  if(b){
    if(b.getAttribute('aria-pressed')==='true')return;
    if(b.matches('#ex button'))track('ejemplo/'+(b.dataset.e||'generico'),'Ejemplo: '+(EJ[b.dataset.e]?EJ[b.dataset.e].lb:'Sin ejemplo'),1);
    else if(b.matches('.sw'))track('color/'+b.dataset.t,'Color: '+nmTxE(b),1);
    else if(b.matches('.ft'))track('tipografia/'+b.dataset.f,'Tipografía: '+esT(b.querySelector('span').firstChild),1);
    else if(b.matches('.bgb'))track('fondo/'+b.dataset.b,'Fondo: '+nmTxE(b),1);
    else if(b.dataset.m)track('modo/'+b.dataset.m,'Modo '+(b.dataset.m==='light'?'claro':'oscuro'),1);
    else track('foto/'+b.dataset.p,'Foto de perfil: '+(b.dataset.p==='on'?'con foto':'sin foto'),1);
    return;
  }
  const a=t.closest('#sur,#rst,#vmb,#sh,#qm,#wa,#cwa,#bv,#vp,[data-plan]');
  if(!a)return;
  const k=a.id;
  if(k==='sur')track('accion/sorprendeme','Botón Sorprendeme',1);
  else if(k==='rst')track('accion/empezar-de-nuevo','Botón Empezar de nuevo',1);
  else if(k==='vmb'){if(a.getAttribute('aria-checked')==='false')track('accion/vista-celular','Vista de celular',1)}
  else if(k==='bv')track('accion/beneficios','Botón Beneficios',1);
  else if(k==='vp')track('accion/ver-planes','Botón Ver planes y precios',1);
  else{
    // acciones de interés: guardan la combinación con la que llegó hasta acá
    const name=k==='sh'?'compartir':k==='qm'?'quiero-el-mio':k==='wa'?'whatsapp':'plan';
    track('accion/'+name,'Acción: '+name,1);
    if(a.dataset.plan)track('plan/'+a.dataset.plan.toLowerCase().replace(/[^a-z]+/g,'-').replace(/-$/,''),'Plan: '+a.dataset.plan,1);
    track('combo/'+comboKey(),'Combinación final: '+comboKey(),1);
  }
},true);
// la visita de página la cuenta el script oficial de GoatCounter (al final del <body>); acá solo se registran los eventos

// ---- vista de celular (marco de teléfono con la misma página adentro)
var phoneFrame=null,phoneReady=false,phoneOn=false;
const phEl=g$('ph'),pwEl=g$('pw'),vmb=g$('vmb');
if(EMB||!/^(https?|file):$/.test(location.protocol))g$('vm').hidden=true;
function phoneSrc(){const u=shareURL();return location.href.split(/[?#]/)[0]+u.slice(u.indexOf('?'))}
function phoneState(){const c=combo();return{t:c.t,m:c.m,f:c.f,b:c.b,p:c.p,n:ME.n,r:ME.r,c:ME.c,e:SMP||'',l:LANG,cur:CUR}}
function syncPhone(){
  if(!phoneFrame||!phoneReady||!phoneOn)return;
  try{phoneFrame.contentWindow.postMessage({pv:'state',s:phoneState()},'*')}catch(e){}
}
function fitPhone(){
  const r=phEl.getBoundingClientRect();
  pwEl.style.setProperty('--ps',Math.max(.4,Math.min(1,(r.height-64)/788,(r.width-24)/414)).toFixed(3));
}
function phone(on){
  phoneOn=on;phEl.hidden=!on;vmb.setAttribute('aria-checked',on?'true':'false');
  if(!on)return;
  if(!phoneFrame){
    phoneFrame=document.createElement('iframe');
    phoneFrame.name='pv-embed';phoneFrame.title=L('Vista de celular de tu portafolio','Phone view of your portfolio');
    phoneFrame.src=phoneSrc();
    g$('ps').appendChild(phoneFrame);
  }else syncPhone();
  fitPhone();
}
vmb.onclick=()=>phone(vmb.getAttribute('aria-checked')!=='true');
g$('phx').onclick=()=>phone(false);
phEl.onclick=e=>{if(e.target===phEl)phone(false)};
if('ResizeObserver' in window)new ResizeObserver(fitPhone).observe(phEl);
else addEventListener('resize',fitPhone);
addEventListener('message',e=>{
  if(!phoneFrame||e.source!==phoneFrame.contentWindow||!e.data||e.data.pv!=='ready')return;
  phoneReady=true;syncPhone();
});
// dentro del marco: la página recibe los cambios del panel
function pvApply(s){
  if(!s||typeof s!=='object')return;
  const has=(sel,a,v)=>typeof v==='string'&&[...document.querySelectorAll(sel)].some(x=>x.dataset[a]===v);
  if(has('#pp .sw','t',s.t))theme(s.t,true);
  if(s.m==='dark'||s.m==='light')mode(s.m,true);
  if(has('.ft[data-f]','f',s.f))font(s.f);
  if(has('.bgb','b',s.b))bg(s.b);
  setPhoto(s.p===true);
  setSample(typeof s.e==='string'?s.e:'');
  setMe({n:s.n,r:s.r,c:s.c});applyMe();
  if((s.l==='en'||s.l==='es')&&s.l!==LANG)setLang(s.l);
  if(s.cur==='ARS'||s.cur==='USD')setCur(s.cur,true);
}
if(EMB){
  addEventListener('message',e=>{if(e.source===parent&&e.data&&e.data.pv==='state')pvApply(e.data.s)});
  try{parent.postMessage({pv:'ready'},'*')}catch(e){}
}
// ---- moneda (ARS / USD). Base en USD: completo 10, completo + 13 con 11% OFF => precio sin descuento = 13 / 0.89
var PRICES={ARS:{a:15000,b:19500,o:22000},USD:{a:10,b:13,o:Math.round(13/0.89*100)/100}};
function money(v,c){
  const loc=LANG==='en'?'en-US':'es-AR';
  if(c==='USD'){const d=Number.isInteger(v)?0:2;return '$'+v.toLocaleString(loc,{minimumFractionDigits:d,maximumFractionDigits:d})}
  return '$'+Math.round(v).toLocaleString('es-AR');
}
function applyCur(){
  if(!PRICES)return;
  const P=PRICES[CUR]||PRICES.ARS,g=id=>document.getElementById(id);
  if(!g('p1'))return;
  const u='<small>'+CUR+'</small>';
  g('p1').innerHTML=money(P.a,CUR)+' '+u;
  g('p2').innerHTML=money(P.b,CUR)+' '+u;
  g('po').textContent=money(P.o,CUR)+' '+CUR;
  g('t1').textContent=money(P.a,CUR)+' '+CUR;
  g('t2').textContent=money(P.b,CUR)+' '+CUR;
  const opts=document.querySelectorAll('#plan option[value^="Paquete"]');
  opts[0].textContent=L('Paquete completo','Complete package')+' ('+money(P.a,CUR)+' '+CUR+')';
  opts[1].textContent=L('Paquete completo +','Complete package +')+' ('+money(P.b,CUR)+' '+CUR+')';
  document.querySelectorAll('#cu span[data-k]').forEach(x=>x.classList.toggle('on',x.dataset.k===CUR));
}
function setCur(c,silent){
  CUR=c==='USD'?'USD':'ARS';
  applyCur();
  if(!silent&&!EMB)try{localStorage.setItem('pv-cur',CUR)}catch(e){}
  if(typeof renderSummary==='function'&&g$)try{renderSummary()}catch(e){}
}
document.getElementById('cu').onclick=()=>setCur(CUR==='ARS'?'USD':'ARS');
applyCur();
applyMe();
renderSummary();
