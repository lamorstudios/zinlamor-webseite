(function(){
  var d=document, $=function(s,c){return (c||d).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.documentElement.classList.add('js');

  /* Menü */
  var burger=$('#burger'), menu=$('#menu');
  function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Menü schließen':'Menü öffnen');d.body.style.overflow=o?'hidden':''}
  if(burger&&menu){burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});$$('a',menu).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});d.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)})}

  /* Leiste + Timecode */
  var bar=$('#bar'), tc=$('#tc'), lastY=window.scrollY||0;
  function onScroll(){
    var y=window.scrollY||0, dy=y-lastY;
    if(bar){if(y>160&&dy>4)bar.classList.add('hide');else if(dy<-4||y<160)bar.classList.remove('hide')}
    lastY=y;
    if(tc){var max=Math.max(1,d.documentElement.scrollHeight-innerHeight), s=(y/max)*3*3600;
      tc.textContent=[Math.floor(s/3600),Math.floor(s%3600/60),Math.floor(s%60),Math.floor((s%1)*25)].map(function(n){return (n<10?'0':'')+n}).join(':')}
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* Einblenden beim Scrollen */
  var els=$$('[data-r]');
  if(!reduce&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  /* Magnetische Buttons */
  if(!reduce&&matchMedia('(pointer:fine)').matches){
    $$('.magnet').forEach(function(b){
      b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.setProperty('--bx',((e.clientX-r.left-r.width/2)*.16)+'px');b.style.setProperty('--by',((e.clientY-r.top-r.height/2)*.28)+'px')});
      b.addEventListener('pointerleave',function(){b.style.setProperty('--bx','0px');b.style.setProperty('--by','0px')});
    });
  }

  /* Blog-Filter */
  var fl=$('#filters');
  if(fl){$$('button',fl).forEach(function(b){b.addEventListener('click',function(){
    $$('button',fl).forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    var t=b.dataset.f; $$('.post[data-tag]').forEach(function(p){p.hidden=!(t==='alle'||p.dataset.tag===t)});
  })})}

  /* Kopieren */
  $$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){
    var v=b.dataset.copy, done=function(){var o=b.textContent;b.textContent='Kopiert';setTimeout(function(){b.textContent=o},1400)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(done,function(){})}
  })});
})();
