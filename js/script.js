/* Abstrix Technologies – vanilla JS. No dependencies. */
document.documentElement.classList.add('js');

/* ===== EDIT YOUR PROJECTS HERE =====
   Add real projects to this array. Set placeholder:false for genuine work.
   Fields: name, problem, features[], tech[], github, demo (use "" to hide a link). */
const PROJECTS = [
  {placeholder:true,name:"Project Name (Sample Placeholder)",problem:"Describe the problem this product solves.",features:["Key feature one","Key feature two","Key feature three"],tech:["Technology A","Technology B"],github:"https://github.com/mohamed-abbas-os",demo:""},
  {placeholder:true,name:"Project Name (Sample Placeholder)",problem:"Describe who it helps and why it matters.",features:["Key feature one","Key feature two"],tech:["Technology A"],github:"https://github.com/mohamed-abbas-os",demo:""},
  {placeholder:true,name:"Project Name (Sample Placeholder)",problem:"Describe the workflow or task it improves.",features:["Key feature one","Key feature two"],tech:["Technology A","Technology B"],github:"https://github.com/mohamed-abbas-os",demo:""}
];
const EMAIL='Mohamed.abbas.devops@gmail.com';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* Projects */
$('#projects').innerHTML=PROJECTS.map(p=>`<article class="card proj reveal">
 ${p.placeholder?'<p class="ph">Sample placeholder – not a client project</p>':''}
 <img class="pi" src="assets/favicon.svg" width="48" height="48" alt="" loading="lazy">
 <h3>${esc(p.name)}</h3><p>${esc(p.problem)}</p>
 <ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>
 <div>${p.tech.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div>
 <div class="links">${p.github?`<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`:''}${p.demo?`<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Live demo</a>`:''}</div></article>`).join('');

/* Footer year */
$('#year').textContent=new Date().getFullYear();

/* Mobile menu */
const burger=$('#burger'),menu=$('#menu');
const setMenu=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')};
burger.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);burger.focus()}});

/* Active nav link */
const links=$$('.menu a:not(.btn)');
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('main section[id]').forEach(s=>spy.observe(s));

/* Reveal on scroll */
const rv=$$('.reveal');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
  rv.forEach(el=>io.observe(el));
}else rv.forEach(el=>el.classList.add('in'));

/* FAQ accordion */
$$('.faq button').forEach(b=>b.addEventListener('click',()=>{
  const open=b.getAttribute('aria-expanded')==='true';
  b.setAttribute('aria-expanded',!open);$('#'+b.getAttribute('aria-controls')).hidden=open;
}));

/* Scroll-to-top */
const top=$('#totop');
addEventListener('scroll',()=>{top.hidden=scrollY<600},{passive:true});
top.addEventListener('click',()=>scrollTo({top:0}));

/* Inquiry form: validate, then build a mailto link. Nothing is sent by the site. */
const form=$('#form');
const rules={name:v=>v.trim()?'':'Please enter your name.',
  email:v=>!v.trim()?'Please enter your email.':/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':'Enter a valid email address.',
  type:v=>v?'':'Please select a project type.',
  req:v=>v.trim().length>=10?'':'Please describe your requirements (at least 10 characters).'};
function check(id){const f=$('#'+id),m=rules[id](f.value);$('#e-'+id).textContent=m;f.setAttribute('aria-invalid',!!m);return !m}
Object.keys(rules).forEach(id=>$('#'+id).addEventListener('blur',()=>check(id)));
form.addEventListener('submit',e=>{
  e.preventDefault();
  const ok=Object.keys(rules).map(check).every(Boolean);
  const c=$('#consent'),cm=c.checked?'':'Please tick the consent box to continue.';
  $('#e-consent').textContent=cm;
  if(!ok||cm){(form.querySelector('[aria-invalid=true]')||c).focus();return}
  const v=id=>$('#'+id).value.trim();
  const body=`Name: ${v('name')}\nEmail: ${v('email')}\nProject type: ${v('type')}\nBudget: ${v('budget')||'Not specified'}\n\nRequirements:\n${v('req')}`;
  const href=`mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry – '+v('type'))}&body=${encodeURIComponent(body)}`;
  $('#fb-link').href=href;$('#fallback').hidden=false;
  location.href=href;
});
