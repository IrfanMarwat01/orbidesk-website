/* Opens the promo video in a lightbox. Without JS, the links fall back to /product#video. */
(function(){
  var SRC='/video/orbidesk-promo-v1.mp4',POSTER='/video/orbidesk-promo-poster-v1.jpg';
  if(!window.HTMLDialogElement)return;
  var dlg,vid,opener;
  function build(){
    dlg=document.createElement('dialog');dlg.className='vidmodal';dlg.setAttribute('aria-label','OrbiDesk AI video');
    dlg.innerHTML='<button type="button" class="vidclose" aria-label="Close video">Close ✕</button><div class="vidwrap"><video controls playsinline preload="none" poster="'+POSTER+'"></video></div>';
    vid=dlg.querySelector('video');
    dlg.querySelector('.vidclose').addEventListener('click',function(){dlg.close()});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
    dlg.addEventListener('close',function(){document.documentElement.classList.remove('vid-open');vid.pause();vid.removeAttribute('src');vid.load();if(opener&&opener.focus)opener.focus()});
    document.body.appendChild(dlg);
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('[data-video-open]');
    if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button)return;
    e.preventDefault();opener=a;if(!dlg)build();
    vid.src=SRC;document.documentElement.classList.add('vid-open');dlg.showModal();
    var p=vid.play();if(p&&p.catch)p.catch(function(){});
  });
})();
