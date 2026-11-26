(()=>{'use strict';
const findExteriorSection=()=>{
  const nodes=[...document.querySelectorAll('h2,h3')];
  const h=nodes.find(n=>/exterior gallery/i.test(n.textContent.trim()));
  if(!h)return null;
  return h.closest('section')||h.closest('.section')||h.parentElement;
};
function insertGallery(model,slug){
  if(document.querySelector('.asi-gallery-reserve'))return;
  const slots=(model.slots||[]).filter(s=>s.src);
  if(!slots.length)return;
  const container=document.createElement('section');container.className='asi-gallery-reserve';container.dataset.model=slug;container.setAttribute('aria-label',model.name+' exterior detail gallery');
  const h=document.createElement('h3');h.textContent='Exterior Details';container.append(h);
  const intro=document.createElement('p');intro.textContent='Explore the building and its craftsmanship through the original exterior photograph and genuine detail crops.';container.append(intro);
  const grid=document.createElement('div');grid.className='asi-gallery-grid';
  slots.forEach((s,i)=>{
    const card=document.createElement('button');card.type='button';card.className='asi-gallery-card';card.setAttribute('aria-label','Enlarge '+s.label);
    const pic=document.createElement('img');pic.src=s.src;pic.alt=s.alt||s.label;pic.loading='lazy';pic.decoding='async';if(s.width&&s.height){pic.width=s.width;pic.height=s.height;}card.append(pic);
    const c=document.createElement('span');c.className='asi-gallery-caption';c.textContent=String(i+1).padStart(2,'0')+' — '+s.label;card.append(c);
    card.addEventListener('click',()=>showPhoto(pic.src,pic.alt,c.textContent));
    grid.append(card);
  });container.append(grid);
  const note=document.createElement('p');note.className='asi-gallery-note';note.textContent='All detail views are crops from the approved exterior photograph; they do not represent additional camera angles or optional configurations.';container.append(note);
  const target=findExteriorSection();if(target)target.insertAdjacentElement('afterend',container);else (document.querySelector('main')||document.body).append(container);
}
let dialog;
function showPhoto(src,alt,caption){
 if(!dialog){dialog=document.createElement('dialog');dialog.className='asi-gallery-dialog';dialog.innerHTML='<button type="button" class="asi-gallery-close" aria-label="Close enlarged image">Close ×</button><img alt=""><p></p>';document.body.append(dialog);dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});}
 dialog.querySelector('img').src=src;dialog.querySelector('img').alt=alt;dialog.querySelector('p').textContent=caption;
 if(typeof dialog.showModal==='function')dialog.showModal();
}
const current=document.currentScript,slug=current&&current.dataset.model;if(!slug)return;
fetch('/assets/gallery/model-gallery-manifest.json').then(r=>{if(!r.ok)throw Error('gallery manifest unavailable');return r.json();}).then(m=>{if(m[slug])insertGallery(m[slug],slug);}).catch(()=>{});
})();