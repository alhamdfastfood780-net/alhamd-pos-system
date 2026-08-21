(function () {
  /* ---------- Mobile hamburger menu: Salesman (Add Sale / Add Expense) ---------- */
  var mobileActionsDropdown = document.getElementById('mobileActionsDropdown');
  var salesmanMenuBtn = document.getElementById('salesmanMenuBtn');

  window.toggleMobileActionsMenu = function (e) {
    if (e) e.stopPropagation();
    var isOpen = mobileActionsDropdown.classList.toggle('show');
    if (salesmanMenuBtn) salesmanMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };
  window.closeMobileActionsMenu = function () {
    mobileActionsDropdown.classList.remove('show');
    if (salesmanMenuBtn) salesmanMenuBtn.setAttribute('aria-expanded', 'false');
  };
  document.addEventListener('click', function (e) {
    if (mobileActionsDropdown && mobileActionsDropdown.classList.contains('show')) {
      if (!e.target.closest('#mobileActionsDropdown') && !e.target.closest('#salesmanMenuBtn')) {
        closeMobileActionsMenu();
      }
    }
  });
  // Keep the dropdown's active-state in sync with the real nav buttons
  var origShowSale = window.showSaleSection;
  var origOpenExpense = window.openExpenseModal;
  function syncMobileNavActive(activeId) {
    var sale = document.getElementById('mobileNavAddSaleBtn');
    var exp = document.getElementById('mobileNavAddExpenseBtn');
    if (sale) sale.classList.toggle('active', activeId === 'sale');
    if (exp) exp.classList.toggle('active', activeId === 'expense');
  }
  if (typeof origShowSale === 'function') {
    window.showSaleSection = function () { syncMobileNavActive('sale'); return origShowSale.apply(this, arguments); };
  }
  if (typeof origOpenExpense === 'function') {
    window.openExpenseModal = function () { syncMobileNavActive('expense'); return origOpenExpense.apply(this, arguments); };
  }

  /* ---------- Mobile hamburger menu: Owner sidebar drawer ---------- */
  var adminSidebar = document.getElementById('adminSidebar');
  var adminOverlay = document.getElementById('adminOverlay');
  var adminMenuBtn = document.getElementById('adminMenuBtn');

  window.toggleAdminSidebar = function () {
    var isOpen = adminSidebar.classList.toggle('open');
    adminOverlay.classList.toggle('show', isOpen);
    if (adminMenuBtn) adminMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };
  window.closeAdminSidebar = function () {
    adminSidebar.classList.remove('open');
    adminOverlay.classList.remove('show');
    if (adminMenuBtn) adminMenuBtn.setAttribute('aria-expanded', 'false');
  };
  document.querySelectorAll('.admin-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.innerWidth <= 900) closeAdminSidebar();
    });
  });

  /* ---------- Service worker registration ----------
     No custom install button — once this is registered alongside the
     embedded manifest, Chrome/Edge show their own native "Install app"
     entry in the address bar and the browser menu automatically. */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      try {
        var swSource = [
          'const CACHE_NAME = "alhamd-pos-v1";',
          'self.addEventListener("install", function (event) {',
          '  self.skipWaiting();',
          '  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.add(self.registration.scope).catch(function(){}); }));',
          '});',
          'self.addEventListener("activate", function (event) {',
          '  event.waitUntil(caches.keys().then(function (keys) {',
          '    return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); }));',
          '  }));',
          '  self.clients.claim();',
          '});',
          'self.addEventListener("fetch", function (event) {',
          '  if (event.request.method !== "GET") return;',
          '  event.respondWith(',
          '    caches.match(event.request).then(function (cached) {',
          '      const networkFetch = fetch(event.request).then(function (response) {',
          '        if (response && response.status === 200 && response.type === "basic") {',
          '          const clone = response.clone();',
          '          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });',
          '        }',
          '        return response;',
          '      }).catch(function () { return cached; });',
          '      return cached || networkFetch;',
          '    })',
          '  );',
          '});'
        ].join('\n');
        var swBlob = new Blob([swSource], { type: 'application/javascript' });
        var swUrl = URL.createObjectURL(swBlob);
        navigator.serviceWorker.register(swUrl, { scope: './' }).catch(function (err) {
          console.warn('Service worker registration failed:', err);
        });
      } catch (err) {
        console.warn('Service worker setup skipped:', err);
      }
    });
  }
})();
