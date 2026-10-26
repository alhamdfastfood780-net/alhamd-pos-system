/* Makes the POS installable as a mobile app (Add to Home Screen). */
(function(){
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('sw.js').catch(function(){});
    });
  }

  var deferred = null;
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if(isStandalone) return;

  var btn = document.createElement('button');
  btn.id = 'installAppBtn';
  btn.type = 'button';
  btn.textContent = '📲 Install App';
  btn.style.cssText = 'display:none;position:fixed;right:14px;bottom:14px;z-index:99999;padding:12px 18px;border:0;border-radius:999px;background:#e0522f;color:#fff;font:600 14px Poppins,Inter,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.28);cursor:pointer;';
  document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(btn); });
  if(document.body) document.body.appendChild(btn);

  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    deferred = e;
    btn.style.display = 'block';
  });

  btn.addEventListener('click', function(){
    if(deferred){
      deferred.prompt();
      deferred.userChoice.finally(function(){ deferred = null; btn.style.display = 'none'; });
    } else {
      alert('iPhone: tap Share ▸ "Add to Home Screen".');
    }
  });

  window.addEventListener('appinstalled', function(){ btn.style.display = 'none'; });

  /* iPhone/Safari has no install prompt — show the button with instructions */
  var ua = navigator.userAgent || '';
  if(/iPad|iPhone|iPod/.test(ua)){ document.addEventListener('DOMContentLoaded', function(){ btn.style.display = 'block'; }); }
})();
