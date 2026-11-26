/* ASI common nav/back-to-top behavior. No page-specific pricing or layouts changed. */
(function(){
 function boot(){
  var header=document.querySelector('.asi-global-header');
  var toggle=document.querySelector('.asi-menu-toggle');
  var links=document.querySelector('.asi-nav-links');
  if(toggle&&links){
   toggle.addEventListener('click',function(){var open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));links.classList.toggle('asi-open',open);});
   links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('asi-open');toggle.setAttribute('aria-expanded','false');});});
   document.addEventListener('keydown',function(e){if(e.key==='Escape'){links.classList.remove('asi-open');toggle.setAttribute('aria-expanded','false');}});
  }
  var button=document.createElement('button');button.className='asi-back-to-top';button.type='button';button.setAttribute('aria-label','Back to top');button.setAttribute('title','Back to top');button.textContent='↑';document.body.appendChild(button);
  function update(){var y=Math.max(window.scrollY||0,document.documentElement.scrollTop||0,document.body.scrollTop||0);button.classList.toggle('asi-show',y>480);if(header)header.classList.toggle('asi-is-scrolled',y>36);}
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});update();
  button.addEventListener('click',function(){var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:0,behavior:reduce?'instant':'smooth'});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
