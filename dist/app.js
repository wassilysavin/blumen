const flowers = [
  {name:'Мак',price:15,imageOffset:[23.5,28.5]},
  {name:'Василёк',price:12,imageOffset:[0.5,34.5]},
  {name:'Георгин',price:25,imageOffset:[-17,34]},
  {name:'Космея',price:12,imageOffset:[26,28.5]},
  {name:'Ирис',price:18,imageOffset:[0,26.5]},
  {name:'Ранункулюс',price:22,imageOffset:[-11,34.5]},
  {name:'Рудбекия',price:15,imageOffset:[29,1.5]},
  {name:'Роза',price:20,imageOffset:[-1,0.5]},
  {name:'Скабиоза',price:18,imageOffset:[-12.5,-1]}
];
const $ = (selector) => document.querySelector(selector);
let currentFlower=0, currentView='orbit';
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const spriteStyle = (i) => `--sprite-x:${i%3*50}%;--sprite-y:${Math.floor(i/3)*50}%`;
const number = (i) => String(i+1).padStart(2,'0');

flowers.forEach((flower,i)=>{
  const item=document.createElement('div');
  item.className='orbit-item';
  item.style=`--angle:${i*40-12}deg;--tilt:${[9,-16,11,-9,14,-12,10,-15,7][i]}deg;${spriteStyle(i)}`;
  item.innerHTML=`<div class="orbit-counter"><button class="flower-button" aria-label="${flower.name} — рассмотреть цветок"><span class="flower-sprite orbit-flower" aria-hidden="true"></span><span class="flower-tooltip" aria-hidden="true">${flower.name}</span></button></div>`;
  item.querySelector('button').addEventListener('click',()=>openFlower(i));
  $('#orbit').append(item);
});

function renderGrid(){
  const grid=$('#flower-grid');
  grid.replaceChildren();
  flowers.forEach((flower,i)=>{
    const card=document.createElement('button');
    card.className='flower-card';
    card.dataset.flower=String(i);
    card.setAttribute('aria-label',`${flower.name} — рассмотреть цветок`);
    card.innerHTML=`<span class="flower-sprite card-image" style="${spriteStyle(i)}" aria-hidden="true"></span><span class="card-caption"><span>${flower.name}</span><span class="card-arrow" aria-hidden="true"><svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg></span></span><span class="card-meta"><span class="card-price">${flower.price} BYN</span></span>`;
    card.addEventListener('click',()=>openFlower(i));
    grid.append(card);
  });
}
function showView(view,scroll=true){
  currentView=view;
  const isOrbit=view==='orbit';
  $('#orbit-view').hidden=!isOrbit;
  $('#home-information').hidden=!isOrbit;
  $('#collection-view').hidden=isOrbit;
  if(!isOrbit)renderGrid();
  if(scroll){
    history.replaceState(null,'',location.pathname+location.search);
    window.scrollTo({top:0,behavior:'instant'});
  }
}

function goToSection(hash,smooth=true){
  if(!hash?.startsWith('#'))return;
  const target=document.getElementById(hash.slice(1));
  if(!target||!target.closest('#home-information'))return;
  document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
  showView('orbit',false);
  if(target.tagName==='DETAILS')target.open=true;
  history.replaceState(null,'',hash);
  target.focus({preventScroll:true});
  target.scrollIntoView({behavior:smooth&&!reducedMotion.matches?'smooth':'instant',block:'start'});
}
function renderDetail(){
  const f=flowers[currentFlower];
  $('#detail-flower').style=spriteStyle(currentFlower);
  // Center the visible bloom within its 418px atlas cell, excluding transparent margins.
  $('#detail-flower').style.setProperty('--center-x',`${-f.imageOffset[0]/418*100}%`);
  $('#detail-flower').style.setProperty('--center-y',`${-f.imageOffset[1]/418*100}%`);
  $('#detail-flower').setAttribute('aria-label',f.name);
  $('#flower-name').textContent=f.name;
  $('#flower-price').textContent=`${f.price} BYN`;
  $('#detail-position').textContent=`${number(currentFlower)} / 09`;
}
function openFlower(i){
  currentFlower=i;renderDetail();
  $('#flower-dialog').showModal();
  document.body.classList.add('modal-open');
}
function stepFlower(delta){currentFlower=(currentFlower+delta+flowers.length)%flowers.length;renderDetail();}

$('#previous-flower').addEventListener('click',()=>stepFlower(-1));
$('#next-flower').addEventListener('click',()=>stepFlower(1));
$('#flower-dialog').addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();stepFlower(1);}if(event.key==='ArrowLeft'){event.preventDefault();stepFlower(-1);}});
document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('modal-open');
    if(dialog.id==='flower-dialog'&&currentView!=='orbit'){
      const target=document.querySelector(`[data-flower="${currentFlower}"]`)||document.querySelector('.flower-card')||document.querySelector('.back-to-orbit');
      target?.focus();
    }
  });
});
$('#view-all').addEventListener('click',()=>showView('gallery'));
$('.brand-link').addEventListener('click',event=>{event.preventDefault();showView('orbit');});
$('.back-to-orbit').addEventListener('click',()=>showView('orbit'));
document.querySelectorAll('[data-section]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  goToSection(link.getAttribute('href'));
}));
window.addEventListener('hashchange',()=>{if(location.hash)goToSection(location.hash);});
if(location.hash)goToSection(location.hash,false);
