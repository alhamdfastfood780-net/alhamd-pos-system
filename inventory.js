/* =====================================================================
   INVENTORY · PURCHASE · KITCHEN USAGE  (Owner / Admin panel only)
   Uses the same Firestore `db` and helper functions as script.js.
   Firestore collections created automatically on first save:
     stockItems      { name, unit, qty, minQty, createdAt }
     stockPurchases  { itemId, itemName, unit, qty, unitPrice, total, supplier, date }
     kitchenUsage    { billNo, date, usedBy, note, items:[{itemId,name,unit,qty}] }
   ===================================================================== */
(function(){
  const stockCol    = db.collection('stockItems');
  const purchaseCol = db.collection('stockPurchases');
  const kitchenCol  = db.collection('kitchenUsage');
  const FV = firebase.firestore.FieldValue;

  const UNITS = ['kg','g','litre','ml','piece','dozen','packet','box','bottle','can'];

  let stockItems   = [];   // [{id,name,unit,qty,minQty}]
  let purchases    = [];   // [{id,...,date:Date}]
  let kitchenBills = [];   // [{id,...,date:Date}]
  let kitchenCart  = [];   // [{id, qty}]
  let editingItemId = null;
  let editingPurchaseId = null;
  let editingKitchenId = null;

  /* ---------------- small helpers ---------------- */
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const round3 = (n) => Math.round((Number(n) || 0) * 1000) / 1000;
  const fmtQty = (n) => String(round3(n));
  const todayStr = () => {
    const t = new Date();
    return t.getFullYear() + '-' + String(t.getMonth()+1).padStart(2,'0') + '-' + String(t.getDate()).padStart(2,'0');
  };
  const pad2 = (n) => String(n).padStart(2,'0');
  const dateToStr = (d) => d.getFullYear() + '-' + pad2(d.getMonth()+1) + '-' + pad2(d.getDate());
  const findItem = (id) => stockItems.find(i => i.id === id);
  const r6 = (n) => Math.round((Number(n) || 0) * 1e6) / 1e6;
  const factorOf = (i) => (i && i.useFactor > 0) ? i.useFactor : 1;
  const useUnitOf = (i) => (i && i.useUnit) ? i.useUnit : (i ? i.unit : '');
  // e.g. "5 dozen (60 piece)"
  const stockText = (i) => fmtQty(i.qty) + ' ' + i.unit +
    (factorOf(i) !== 1 ? ' (' + fmtQty(i.qty * factorOf(i)) + ' ' + useUnitOf(i) + ')' : '');
  const stepFor = (unit) => (unit === 'g' || unit === 'ml') ? 100 : (unit === 'kg' || unit === 'litre') ? 0.5 : 1;

  function makeMatcher(mode, dateStr){
    const picked = dateStr ? new Date(dateStr + 'T00:00:00') : new Date();
    return (d) => {
      if(mode === 'daily')   return isSameDay(d, picked);
      if(mode === 'weekly')  return isSameWeek(d, picked);
      if(mode === 'monthly') return d.getFullYear() === picked.getFullYear() && d.getMonth() === picked.getMonth();
      return d.getFullYear() === picked.getFullYear();
    };
  }
  function flash(id){
    const el = $(id); if(!el) return;
    el.classList.add('show');
    setTimeout(() => { el.classList.remove('show'); }, 1800);
  }

  /* ---------------- live Firestore listeners ---------------- */
  stockCol.orderBy('name').onSnapshot((snap) => {
    stockItems = snap.docs.map(d => Object.assign({ id: d.id }, d.data(), {
      qty: Number(d.data().qty) || 0, minQty: Number(d.data().minQty) || 0,
      useUnit: d.data().useUnit || d.data().unit,
      useFactor: Number(d.data().useFactor) > 0 ? Number(d.data().useFactor) : 1
    }));
    // drop cart lines whose item was deleted
    kitchenCart = kitchenCart.filter(l => findItem(l.id));
    renderAll();
  }, (err) => console.error('Stock listen failed:', err));

  purchaseCol.orderBy('date', 'desc').onSnapshot((snap) => {
    purchases = snap.docs.map(d => Object.assign({ id: d.id }, d.data(), { date: new Date(d.data().date) }));
    renderPurchaseHistory();
  }, (err) => console.error('Purchases listen failed:', err));

  kitchenCol.orderBy('date', 'desc').onSnapshot((snap) => {
    kitchenBills = snap.docs.map(d => Object.assign({ id: d.id }, d.data(), { date: new Date(d.data().date) }));
    renderKitchenReport();
  }, (err) => console.error('Kitchen usage listen failed:', err));

  function renderAll(){
    renderInventory();
    renderPurchaseSelect();
    renderKitchenGrid();
    renderKitchenBill();
    renderKitchenReport();
    if(typeof NotificationSystem !== 'undefined') NotificationSystem.refresh();
  }

  /* =================================================================
     1) INVENTORY
     ================================================================= */
  function fillUnitSelect(){
    const sel = $('stkUnit');
    if(sel && !sel.options.length) sel.innerHTML = UNITS.map(u => `<option value="${u}">${u}</option>`).join('');
    const us = $('stkUseUnit');
    if(us && !us.options.length) us.innerHTML = '<option value="">Same as above</option>' + UNITS.map(u => `<option value="${u}">${u}</option>`).join('');
  }

  // shows the "1 dozen = ? piece" box only when kitchen unit is different
  window.stockUnitChanged = function(){
    const unit = $('stkUnit').value;
    const use = $('stkUseUnit').value;
    const diff = use && use !== unit;
    $('stkFactorWrap').classList.toggle('hidden', !diff);
    if(diff) $('stkFactorLabel').textContent = '1 ' + unit + ' = how many ' + use + '?';
  };

  function stockStatus(i){
    if(i.qty <= 0)          return { cls:'out', label:'Out of stock' };
    if(i.minQty > 0 && i.qty <= i.minQty) return { cls:'low', label:'Running low' };
    return { cls:'ok', label:'OK' };
  }

  function renderInventory(){
    const body = $('stockTableBody'); if(!body) return;
    fillUnitSelect();
    const q = (($('stockSearchInput') || {}).value || '').trim().toLowerCase();
    const list = stockItems.filter(i => !q || i.name.toLowerCase().includes(q));
    const low = stockItems.filter(i => i.qty <= 0 || (i.minQty > 0 && i.qty <= i.minQty)).length;
    const sum = $('stockSummary');
    if(sum) sum.textContent = stockItems.length + ' items' + (low ? ' · ' + low + ' low / out of stock' : '');

    if(!list.length){
      body.innerHTML = `<tr class="empty-row"><td colspan="5">${q ? 'No matching items.' : 'No stock items yet. Add your first item above.'}</td></tr>`;
      return;
    }
    body.innerHTML = list.map(i => {
      const st = stockStatus(i);
      return `<tr>
        <td><strong>${esc(i.name)}</strong></td>
        <td><strong>${esc(stockText(i))}</strong></td>
        <td>${i.minQty > 0 ? fmtQty(i.minQty) + ' ' + esc(i.unit) : '—'}</td>
        <td><span class="stk-badge ${st.cls}">${st.label}</span></td>
        <td>
          <button class="view-btn" onclick="stockEditItem('${i.id}')">✏️</button>
          <button class="expense-del-btn" onclick="stockDeleteItem('${i.id}')">🗑️</button>
        </td>
      </tr>`;
    }).join('');
  }

  window.renderInventory = renderInventory;

  window.stockSaveItem = function(){
    const name = $('stkName').value.trim();
    const unit = $('stkUnit').value;
    const qty  = round3($('stkQty').value);
    const minQty = round3($('stkMin').value);
    const pickedUse = $('stkUseUnit').value;
    const useUnit = (pickedUse && pickedUse !== unit) ? pickedUse : unit;
    const useFactor = useUnit === unit ? 1 : Number($('stkFactor').value);
    if(!name){ alert('Enter the item name.'); return; }
    if(!(useFactor > 0)){ alert('Enter how many ' + useUnit + ' are in 1 ' + unit + ' (example: 12).'); return; }
    if(qty < 0 || minQty < 0){ alert('Quantity cannot be negative.'); return; }
    const dup = stockItems.find(i => i.name.toLowerCase() === name.toLowerCase() && i.id !== editingItemId);
    if(dup){ alert('An item with this name already exists.'); return; }

    const btn = $('stkSaveBtn'); btn.disabled = true;
    const p = editingItemId
      ? stockCol.doc(editingItemId).update({ name, unit, qty, minQty, useUnit, useFactor })
      : stockCol.add({ name, unit, qty, minQty, useUnit, useFactor, createdAt: new Date().toISOString() });
    p.then(() => { stockResetForm(); flash('stkSavedTag'); })
     .catch(err => { console.error(err); alert('Could not save — check your connection / Firestore rules.'); })
     .finally(() => { btn.disabled = false; });
  };

  window.stockEditItem = function(id){
    const i = findItem(id); if(!i) return;
    editingItemId = id;
    $('stkName').value = i.name;
    $('stkUnit').value = i.unit;
    $('stkQty').value = i.qty;
    $('stkMin').value = i.minQty || '';
    $('stkUseUnit').value = useUnitOf(i) === i.unit ? '' : useUnitOf(i);
    $('stkFactor').value = factorOf(i) !== 1 ? factorOf(i) : '';
    stockUnitChanged();
    $('stkQtyLabel').textContent = 'Quantity in stock (' + i.unit + ')';
    $('stkSaveBtn').textContent = '💾 Update Item';
    $('stkCancelBtn').classList.remove('hidden');
    $('stkName').focus();
    $('stkName').scrollIntoView({ behavior:'smooth', block:'center' });
  };

  window.stockResetForm = function(){
    editingItemId = null;
    $('stkName').value = ''; $('stkQty').value = ''; $('stkMin').value = '';
    $('stkUseUnit').value = ''; $('stkFactor').value = '';
    stockUnitChanged();
    $('stkQtyLabel').textContent = 'Quantity you have now';
    $('stkSaveBtn').textContent = '➕ Add Item';
    $('stkCancelBtn').classList.add('hidden');
  };

  window.stockDeleteItem = function(id){
    const i = findItem(id); if(!i) return;
    showConfirmModal('Delete stock item?',
      '"' + i.name + '" will be removed from inventory. Past purchase and kitchen records stay in the history.',
      '🗑️ Yes, Delete',
      function(){ stockCol.doc(id).delete().catch(err => { console.error(err); alert('Could not delete.'); }); },
      '🗑️');
  };

  /* =================================================================
     2) PURCHASE
     ================================================================= */
  function renderPurchaseSelect(){
    const sel = $('purItem'); if(!sel) return;
    const keep = sel.value;
    sel.innerHTML = '<option value="">— choose stock item —</option>' +
      stockItems.map(i => `<option value="${i.id}">${esc(i.name)} (${esc(i.unit)})</option>`).join('');
    if(keep && findItem(keep)) sel.value = keep;
    purchaseFormChanged();
    if($('purDate') && !$('purDate').value) $('purDate').value = todayStr();
    if($('purReportDate') && !$('purReportDate').value) $('purReportDate').value = todayStr();
  }

  window.purchaseFormChanged = function(){
    const i = findItem(($('purItem') || {}).value);
    const unitEl = $('purUnitLabel'); if(unitEl) unitEl.textContent = i ? 'Quantity (' + i.unit + ')' : 'Quantity';
    const rateEl = $('purRateLabel'); if(rateEl) rateEl.textContent = i ? 'Price per ' + i.unit + ' (Rs)' : 'Price per unit (Rs)';
    const t = $('purTotalPreview');
    if(t){
      const total = (Number($('purQty').value) || 0) * (Number($('purPrice').value) || 0);
      t.textContent = 'Total: Rs ' + Math.round(total).toLocaleString();
    }
  };

  window.purchaseSave = function(){
    const item = findItem($('purItem').value);
    const qty = round3($('purQty').value);
    const unitPrice = Number($('purPrice').value) || 0;
    const supplier = $('purSupplier').value.trim();
    const dateVal = $('purDate').value || todayStr();
    if(!item){ alert('Choose the stock item you purchased.'); return; }
    if(!(qty > 0)){ alert('Enter a quantity greater than 0.'); return; }
    if(unitPrice < 0){ alert('Price cannot be negative.'); return; }
    if(editingPurchaseId){ purchaseUpdate(item, qty, unitPrice, supplier, dateVal); return; }

    const now = new Date();
    const when = new Date(dateVal + 'T' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0') + ':' + String(now.getSeconds()).padStart(2,'0'));
    const batch = db.batch();
    batch.set(purchaseCol.doc(), {
      itemId: item.id, itemName: item.name, unit: item.unit,
      qty, unitPrice, total: Math.round(qty * unitPrice * 100) / 100,
      supplier, date: when.toISOString()
    });
    batch.update(stockCol.doc(item.id), { qty: FV.increment(qty) });

    const btn = $('purSaveBtn'); btn.disabled = true;
    batch.commit().then(() => {
      $('purQty').value = ''; $('purPrice').value = ''; $('purSupplier').value = '';
      purchaseFormChanged(); flash('purSavedTag');
    }).catch(err => { console.error(err); alert('Could not save purchase — check your connection / Firestore rules.'); })
      .finally(() => { btn.disabled = false; });
  };

  /* ---- edit / delete a purchase (stock is corrected automatically) ---- */
  window.purchaseEdit = function(id){
    const p = purchases.find(x => x.id === id); if(!p) return;
    if(!findItem(p.itemId)){ alert('This stock item was deleted, so the purchase cannot be edited. You can still delete it.'); return; }
    editingPurchaseId = id;
    $('purItem').value = p.itemId;
    $('purQty').value = p.qty;
    $('purPrice').value = p.unitPrice;
    $('purSupplier').value = p.supplier || '';
    $('purDate').value = dateToStr(p.date);
    purchaseFormChanged();
    $('purFormTitle').textContent = '✏️ Edit Purchase';
    $('purSaveBtn').textContent = '💾 Update Purchase';
    $('purCancelBtn').classList.remove('hidden');
    $('purItem').scrollIntoView({ behavior:'smooth', block:'center' });
  };

  window.purchaseCancelEdit = function(){
    editingPurchaseId = null;
    $('purQty').value = ''; $('purPrice').value = ''; $('purSupplier').value = '';
    $('purDate').value = todayStr();
    $('purFormTitle').textContent = '🛍️ Add Purchase';
    $('purSaveBtn').textContent = '✅ Save Purchase';
    $('purCancelBtn').classList.add('hidden');
    purchaseFormChanged();
  };

  function purchaseUpdate(item, qty, unitPrice, supplier, dateVal){
    const id = editingPurchaseId;
    const orig = purchases.find(x => x.id === id);
    const t = orig ? orig.date : new Date();
    const when = new Date(dateVal + 'T' + pad2(t.getHours()) + ':' + pad2(t.getMinutes()) + ':' + pad2(t.getSeconds()));
    const pRef = purchaseCol.doc(id);
    const btn = $('purSaveBtn'); btn.disabled = true;

    db.runTransaction(async (tx) => {
      const pSnap = await tx.get(pRef);
      if(!pSnap.exists) throw new Error('This purchase no longer exists.');
      const old = pSnap.data();
      const oldQty = Number(old.qty) || 0;
      const newRef = stockCol.doc(item.id);
      const newSnap = await tx.get(newRef);
      if(!newSnap.exists) throw new Error('Stock item not found.');
      const newCur = Number(newSnap.data().qty) || 0;

      if(old.itemId === item.id){
        // same item: stock changes by the difference only
        tx.update(newRef, { qty: Math.max(0, r6(newCur - oldQty + qty)) });
      } else {
        // item changed: take it back from the old item, add to the new one
        const oldRef = stockCol.doc(old.itemId);
        const oldSnap = await tx.get(oldRef);
        if(oldSnap.exists) tx.update(oldRef, { qty: Math.max(0, r6((Number(oldSnap.data().qty) || 0) - oldQty)) });
        tx.update(newRef, { qty: r6(newCur + qty) });
      }
      tx.update(pRef, {
        itemId: item.id, itemName: item.name, unit: item.unit,
        qty, unitPrice, total: Math.round(qty * unitPrice * 100) / 100,
        supplier, date: when.toISOString()
      });
    }).then(() => {
      purchaseCancelEdit(); flash('purSavedTag');
    }).catch(err => {
      console.error(err);
      alert(err && err.message ? err.message : 'Could not update purchase.');
    }).finally(() => { btn.disabled = false; });
  }

  window.purchaseDelete = function(id){
    const p = purchases.find(x => x.id === id); if(!p) return;
    showConfirmModal('Delete this purchase?',
      fmtQty(p.qty) + ' ' + p.unit + ' of ' + p.itemName + ' will be removed from the history and taken out of stock too (stock never goes below 0).',
      '🗑️ Yes, Delete',
      function(){
        const pRef = purchaseCol.doc(id);
        db.runTransaction(async (tx) => {
          const pSnap = await tx.get(pRef);
          if(!pSnap.exists) return;
          const old = pSnap.data();
          const sRef = stockCol.doc(old.itemId);
          const sSnap = await tx.get(sRef);
          if(sSnap.exists) tx.update(sRef, { qty: Math.max(0, r6((Number(sSnap.data().qty) || 0) - (Number(old.qty) || 0))) });
          tx.delete(pRef);
        }).then(() => {
          if(editingPurchaseId === id) purchaseCancelEdit();
        }).catch(err => { console.error(err); alert('Could not delete the purchase — check your connection.'); });
      },
      '🗑️');
  };

  window.renderPurchaseHistory = function(){
    const body = $('purchaseTableBody'); if(!body) return;
    const mode = ($('purRange') || {}).value || 'monthly';
    const match = makeMatcher(mode, ($('purReportDate') || {}).value);
    const q = (($('purSearchInput') || {}).value || '').trim().toLowerCase();
    const list = purchases.filter(p => match(p.date) &&
      (!q || (p.itemName + ' ' + (p.supplier || '')).toLowerCase().includes(q)));
    if(!list.length){
      body.innerHTML = '<tr class="empty-row"><td colspan="8">No purchases in this period.</td></tr>';
    } else {
      body.innerHTML = list.map(p => `<tr>
        <td>${formatDate(p.date)}</td><td>${formatTime(p.date)}</td>
        <td>${esc(p.itemName)}</td>
        <td>${fmtQty(p.qty)} ${esc(p.unit)}</td>
        <td>Rs ${Number(p.unitPrice).toLocaleString()}</td>
        <td>Rs ${Math.round(p.total).toLocaleString()}</td>
        <td>${esc(p.supplier || '—')}</td>
        <td>
          <button class="view-btn" onclick="purchaseEdit('${p.id}')" title="Edit">✏️</button>
          <button class="expense-del-btn" onclick="purchaseDelete('${p.id}')" title="Delete">🗑️</button>
        </td>
      </tr>`).join('');
    }
    const total = list.reduce((s, p) => s + (Number(p.total) || 0), 0);
    const el = $('purchaseGrandTotal'); if(el) el.textContent = 'Rs ' + Math.round(total).toLocaleString();
  };

  /* =================================================================
     3) KITCHEN BILL  (admin only — separate from customer bills)
     ================================================================= */
  function renderKitchenGrid(){
    const grid = $('kitchenGrid'); if(!grid) return;
    const q = (($('kitchenSearchInput') || {}).value || '').trim().toLowerCase();
    const list = stockItems.filter(i => !q || i.name.toLowerCase().includes(q));
    if(!list.length){
      grid.innerHTML = `<div style="grid-column:1/-1;color:#999;text-align:center;padding:40px;">${stockItems.length ? 'No items match your search.' : 'No stock items yet. Add them in Inventory first.'}</div>`;
      return;
    }
    grid.innerHTML = list.map(i => {
      const st = stockStatus(i);
      return `<button class="prod-card kt-card ${i.qty <= 0 ? 'kt-empty' : ''}" onclick="kitchenAdd('${i.id}')">
        <div class="prod-cat">${esc(useUnitOf(i))}</div>
        <div class="prod-name">${esc(i.name)}</div>
        <div class="kt-stock"><span class="stk-badge ${st.cls}">${esc(stockText(i))}</span></div>
      </button>`;
    }).join('');
  }
  window.renderKitchenGrid = renderKitchenGrid;

  window.kitchenAdd = function(id){
    const i = findItem(id); if(!i) return;
    const line = kitchenCart.find(l => l.id === id);
    if(line) line.qty = round3(line.qty + stepFor(useUnitOf(i)));
    else kitchenCart.push({ id, qty: stepFor(useUnitOf(i)) });
    renderKitchenBill();
  };
  window.kitchenStep = function(id, dir){
    const i = findItem(id); const line = kitchenCart.find(l => l.id === id); if(!line || !i) return;
    line.qty = round3(line.qty + dir * stepFor(useUnitOf(i)));
    if(line.qty <= 0) kitchenCart = kitchenCart.filter(l => l.id !== id);
    renderKitchenBill();
  };
  window.kitchenSetQty = function(id, val){
    const line = kitchenCart.find(l => l.id === id); if(!line) return;
    const n = round3(val);
    if(n > 0) line.qty = n; else kitchenCart = kitchenCart.filter(l => l.id !== id);
    renderKitchenBill();
  };
  window.kitchenRemove = function(id){
    kitchenCart = kitchenCart.filter(l => l.id !== id);
    renderKitchenBill();
  };
  window.kitchenClear = function(){ kitchenCart = []; renderKitchenBill(); };

  // how much (in stock units) the bill being edited originally took from each item
  function editRestoreMap(){
    const map = {};
    if(!editingKitchenId) return map;
    const b = kitchenBills.find(x => x.id === editingKitchenId); if(!b) return map;
    (b.items || []).forEach(l => {
      const it = findItem(l.itemId);
      const back = (l.stockQty != null) ? Number(l.stockQty) : (Number(l.qty) || 0) / factorOf(it);
      map[l.itemId] = r6((map[l.itemId] || 0) + back);
    });
    return map;
  }

  function renderKitchenBill(){
    const wrap = $('kitchenBillItems'); if(!wrap) return;
    const saveBtn = $('kitchenSaveBtn');
    if(!kitchenCart.length){
      wrap.innerHTML = '<div class="bill-empty">Tap stock items to add them to the kitchen bill.</div>';
      if(saveBtn) saveBtn.disabled = true;
      return;
    }
    let anyOver = false;
    wrap.innerHTML = kitchenCart.map(l => {
      const i = findItem(l.id); if(!i) return '';
      const have = (i.qty + (editRestoreMap()[i.id] || 0)) * factorOf(i);   // stock in kitchen unit (+ what this bill already took when editing)
      const over = l.qty > have + 1e-6; if(over) anyOver = true;
      return `<div class="bill-item">
        <div>
          <div class="bi-name">${esc(i.name)}</div>
          <div class="bi-sub" ${over ? 'style="color:#c62828;font-weight:700;"' : ''}>${over ? 'Only ' : 'In stock: '}${fmtQty(have)} ${esc(useUnitOf(i))}</div>
        </div>
        <div class="qty-ctrl">
          <button onclick="kitchenStep('${l.id}',-1)">−</button>
          <input type="number" class="kt-qty-input" min="0" step="any" value="${l.qty}" onchange="kitchenSetQty('${l.id}', this.value)">
          <span class="bi-sub">${esc(useUnitOf(i))}</span>
          <button onclick="kitchenStep('${l.id}',1)">+</button>
          <button class="ebc-remove-btn" onclick="kitchenRemove('${l.id}')" aria-label="Remove">✕</button>
        </div>
      </div>`;
    }).join('');
    if(saveBtn) saveBtn.disabled = anyOver;
    const warn = $('kitchenWarn'); if(warn) warn.textContent = anyOver ? 'Some quantities are more than what is in stock.' : '';
  }

  window.kitchenSave = function(){
    if(editingKitchenId){ kitchenUpdate(); return; }
    if(!kitchenCart.length) return;
    const cart = kitchenCart.map(l => ({ id: l.id, qty: l.qty }));
    const note = ($('kitchenNote').value || '').trim();
    const usedBy = (typeof currentUser !== 'undefined' && currentUser && currentUser.name) ? currentUser.name : 'Owner';
    const maxNo = kitchenBills.reduce((m, x) => Math.max(m, parseInt(String(x.billNo || '').replace(/\D/g, ''), 10) || 0), 0);
    const billNo = 'K-' + String(Math.max(maxNo, kitchenBills.length) + 1).padStart(4, '0');
    const when = new Date();
    const saveBtn = $('kitchenSaveBtn');
    saveBtn.disabled = true;
    let printed = null;

    db.runTransaction(async (tx) => {
      const refs  = cart.map(l => stockCol.doc(l.id));
      const snaps = await Promise.all(refs.map(r => tx.get(r)));
      const lines = [], deducts = [];
      snaps.forEach((s, i) => {
        if(!s.exists) throw new Error('An item was removed from stock.');
        const d = s.data();
        const factor = Number(d.useFactor) > 0 ? Number(d.useFactor) : 1;
        const useUnit = d.useUnit || d.unit;
        const deduct = r6(cart[i].qty / factor);          // e.g. 3 piece -> 0.25 dozen
        if(deduct > (Number(d.qty) || 0) + 1e-6)
          throw new Error('Not enough ' + d.name + ' in stock (only ' + fmtQty((Number(d.qty) || 0) * factor) + ' ' + useUnit + ' left).');
        deducts.push(deduct);
        lines.push({ itemId: s.id, name: d.name, unit: useUnit, qty: cart[i].qty, stockQty: deduct, stockUnit: d.unit });
      });
      snaps.forEach((s, i) => tx.update(refs[i], { qty: FV.increment(-deducts[i]) }));
      tx.set(kitchenCol.doc(), { billNo, date: when.toISOString(), usedBy, note, items: lines });
      printed = { billNo, date: when, usedBy, note, items: lines };
    }).then(() => {
      kitchenCart = []; $('kitchenNote').value = '';
      renderKitchenBill(); flash('kitchenSavedTag');
      if(printed) printKitchenBill(printed);      // always print after saving
    }).catch(err => {
      console.error(err);
      alert(err && err.message ? err.message : 'Could not save kitchen bill.');
      renderKitchenBill();
    });
  };

  /* ---- edit / delete a kitchen bill (stock is corrected automatically) ---- */
  function kitchenEditUI(on){
    $('kitchenBillHeader').textContent = on ? '✏️ Edit Kitchen Bill ' + ((kitchenBills.find(x => x.id === editingKitchenId) || {}).billNo || '') : '🍳 Kitchen Bill';
    $('kitchenSaveBtn').textContent = on ? '💾 Update Bill' : '🖨️ Save, Deduct & Print';
    $('kitchenCancelBtn').classList.toggle('hidden', !on);
  }

  window.kitchenEdit = function(id){
    const b = kitchenBills.find(x => x.id === id); if(!b) return;
    const lines = (b.items || []).filter(l => findItem(l.itemId));
    if(lines.length < (b.items || []).length) alert('Some items in this bill were deleted from stock, so they are skipped.');
    if(!lines.length){ alert('All items of this bill were deleted from stock, so it cannot be edited. You can still delete it.'); return; }
    editingKitchenId = id;
    kitchenCart = lines.map(l => ({ id: l.itemId, qty: Number(l.qty) || 0 }));
    $('kitchenNote').value = b.note || '';
    showAdminSection('kitchen');
    kitchenEditUI(true);
    renderKitchenBill();
  };

  window.kitchenCancelEdit = function(){
    editingKitchenId = null;
    kitchenCart = []; $('kitchenNote').value = '';
    kitchenEditUI(false);
    renderKitchenBill();
  };

  function kitchenUpdate(){
    if(!kitchenCart.length) return;
    const id = editingKitchenId;
    const cart = kitchenCart.map(l => ({ id: l.id, qty: l.qty }));
    const note = ($('kitchenNote').value || '').trim();
    const bRef = kitchenCol.doc(id);
    const saveBtn = $('kitchenSaveBtn'); saveBtn.disabled = true;

    db.runTransaction(async (tx) => {
      const bSnap = await tx.get(bRef);
      if(!bSnap.exists) throw new Error('This kitchen bill no longer exists.');
      const old = bSnap.data();
      const ids = Array.from(new Set((old.items || []).map(l => l.itemId).concat(cart.map(l => l.id))));
      const snaps = await Promise.all(ids.map(x => tx.get(stockCol.doc(x))));
      const data = {}; snaps.forEach(s => { if(s.exists) data[s.id] = s.data(); });
      const delta = {};   // + gives back to stock, - takes from stock
      (old.items || []).forEach(l => {
        const d = data[l.itemId]; if(!d) return;
        const f = Number(d.useFactor) > 0 ? Number(d.useFactor) : 1;
        const back = (l.stockQty != null) ? Number(l.stockQty) : (Number(l.qty) || 0) / f;
        delta[l.itemId] = r6((delta[l.itemId] || 0) + back);
      });
      const lines = [];
      cart.forEach(l => {
        const d = data[l.id]; if(!d) throw new Error('An item was removed from stock.');
        const f = Number(d.useFactor) > 0 ? Number(d.useFactor) : 1;
        const useUnit = d.useUnit || d.unit;
        const deduct = r6(l.qty / f);
        delta[l.id] = r6((delta[l.id] || 0) - deduct);
        lines.push({ itemId: l.id, name: d.name, unit: useUnit, qty: l.qty, stockQty: deduct, stockUnit: d.unit });
      });
      Object.keys(delta).forEach(k => {
        const d = data[k];
        const next = r6((Number(d.qty) || 0) + delta[k]);
        if(next < -1e-6){
          const f = Number(d.useFactor) > 0 ? Number(d.useFactor) : 1;
          throw new Error('Not enough ' + d.name + ' in stock.');
        }
        tx.update(stockCol.doc(k), { qty: Math.max(0, next) });
      });
      tx.update(bRef, { items: lines, note, editedAt: new Date().toISOString() });
    }).then(() => {
      kitchenCancelEdit(); flash('kitchenSavedTag');
    }).catch(err => {
      console.error(err);
      alert(err && err.message ? err.message : 'Could not update kitchen bill.');
      renderKitchenBill();
    });
  }

  window.kitchenDelete = function(id){
    const b = kitchenBills.find(x => x.id === id); if(!b) return;
    showConfirmModal('Delete kitchen bill ' + (b.billNo || '') + '?',
      'This bill will be removed and the used items will be added back to stock.',
      '🗑️ Yes, Delete',
      function(){
        const bRef = kitchenCol.doc(id);
        db.runTransaction(async (tx) => {
          const bSnap = await tx.get(bRef);
          if(!bSnap.exists) return;
          const old = bSnap.data();
          const items = old.items || [];
          const snaps = await Promise.all(items.map(l => tx.get(stockCol.doc(l.itemId))));
          const back = {};
          items.forEach((l, i) => {
            const s = snaps[i]; if(!s.exists) return;
            const d = s.data();
            const f = Number(d.useFactor) > 0 ? Number(d.useFactor) : 1;
            back[s.id] = r6((back[s.id] || 0) + ((l.stockQty != null) ? Number(l.stockQty) : (Number(l.qty) || 0) / f));
          });
          const cur = {}; snaps.forEach(s => { if(s.exists) cur[s.id] = Number(s.data().qty) || 0; });
          Object.keys(back).forEach(k => tx.update(stockCol.doc(k), { qty: r6(cur[k] + back[k]) }));
          tx.delete(bRef);
        }).then(() => {
          if(editingKitchenId === id) kitchenCancelEdit();
        }).catch(err => { console.error(err); alert('Could not delete the kitchen bill — check your connection.'); });
      },
      '🗑️');
  };

  /* ---------- print a kitchen bill ----------
     Uses the SAME layout, fonts, 80mm width and spacing as the customer
     receipt (copied from the print rules in style.css). No popup. */
  const RECEIPT_PRINT_CSS = `
    @page{ margin:0; size:80mm auto; }
    *{ box-sizing:border-box; }
    html,body{ margin:0; padding:0; background:#fff; color:#000; }
    .receipt{ margin:0 auto; width:80mm; padding:6px 10px; font-weight:700; line-height:1.28; font-family:'Courier New',monospace; background:#fff; }
    .receipt-logo{ display:block; width:130px; height:57px; border-radius:50%; margin:0 auto 4px; object-fit:cover; }
    .receipt h2{ text-align:center; font-size:15px; font-weight:900; margin:0 0 2px; letter-spacing:.02em; }
    .receipt .sub{ text-align:center; font-size:10.5px; font-weight:700; margin:1px 0; color:#222; }
    .dash{ border:none; border-top:1.5px dashed #000; margin:6px 0; }
    .r-status-stamp{ text-align:center; font-size:12.5px; font-weight:900; letter-spacing:.1em; padding:3px 0; margin:5px 0; border-top:1.5px dashed #000; border-bottom:1.5px dashed #000; color:#000; }
    .r-row{ display:flex; justify-content:space-between; font-size:11px; font-weight:700; margin:2px 0; }
    .r-item{ margin-top:5px; }
    .r-cols{ display:grid; grid-template-columns:1fr auto; column-gap:10px; align-items:baseline; }
    .r-col-amt{ text-align:right; }
    .r-header.r-cols{ font-size:10.5px; font-weight:900; margin:1px 0; }
    .r-item-name{ font-size:11px; font-weight:900; }
    .r-total-row{ display:flex; justify-content:space-between; font-weight:900; font-size:14px; margin-top:5px; }
    .thanks{ text-align:center; font-size:10.5px; font-weight:700; margin-top:8px; line-height:1.3; }
  `;

  function printKitchenBill(b){
    const items = b.items || [];
    const rows = items.map(l => `
      <div class="r-item">
        <div class="r-cols r-item-name"><span>${esc(l.name)}</span><span class="r-col-amt">${fmtQty(l.qty)} ${esc(l.unit)}</span></div>
      </div>`).join('');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(b.billNo)}</title>
      <style>${RECEIPT_PRINT_CSS}</style></head><body>
      <div class="receipt">
        <img src="https://i.ibb.co/RG8N5j1H/alhamd-logo.png" class="receipt-logo" alt="Alhamd Fast Food">
        <p class="sub">Fresh &amp; Fast Since Day One</p>
        <p class="sub">Tel: 0326-6797564</p>
        <hr class="dash">
        <div class="r-status-stamp">KITCHEN BILL</div>
        <div class="r-row"><span>Bill #: ${esc(b.billNo)}</span><span>${formatDate(b.date)}</span></div>
        <div class="r-row"><span>By: ${esc(b.usedBy || 'Owner')}</span><span>${formatTime(b.date)}</span></div>
        <hr class="dash">
        <div class="r-cols r-header"><span>Item</span><span class="r-col-amt">Qty Used</span></div>
        ${rows}
        <hr class="dash">
        ${b.note ? '<div class="r-row"><span>Note: ' + esc(b.note) + '</span><span></span></div>' : ''}
        <div class="r-total-row"><span>TOTAL ITEMS</span><span>${items.length}</span></div>
        <hr class="dash">
        <p class="thanks">Stock used in kitchen</p>
      </div></body></html>`;

    const old = document.getElementById('kitchenPrintFrame'); if(old) old.remove();
    const f = document.createElement('iframe');
    f.id = 'kitchenPrintFrame';
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    document.body.appendChild(f);
    f.contentDocument.open(); f.contentDocument.write(html); f.contentDocument.close();

    // wait for the logo to load (or fail) so it is on the paper, then print
    let done = false;
    const go = () => { if(done) return; done = true; try{ f.contentWindow.focus(); f.contentWindow.print(); }catch(e){ console.error(e); } };
    const img = f.contentDocument.querySelector('img');
    if(img && !img.complete){ img.onload = go; img.onerror = go; setTimeout(go, 2500); }
    else setTimeout(go, 200);
  }
  window.kitchenPrintLog = function(id){
    const b = kitchenBills.find(x => x.id === id);
    if(b) printKitchenBill(b);
  };

  /* =================================================================
     4) KITCHEN USAGE REPORT  (day / week / month / year)
     ================================================================= */
  window.renderKitchenReport = function(){
    const body = $('kitchenUsageBody'); if(!body) return;
    if($('kuDate') && !$('kuDate').value) $('kuDate').value = todayStr();
    const mode = ($('kuRange') || {}).value || 'daily';
    const dateStr = ($('kuDate') || {}).value;
    const q = (($('kuSearch') || {}).value || '').trim().toLowerCase();

    const periods = { daily: makeMatcher('daily', dateStr), weekly: makeMatcher('weekly', dateStr),
                      monthly: makeMatcher('monthly', dateStr), yearly: makeMatcher('yearly', dateStr) };

    // per-item totals for all four periods
    const agg = {};  // key: itemId (fallback name)
    kitchenBills.forEach(b => {
      (b.items || []).forEach(l => {
        const key = l.itemId || l.name;
        const a = agg[key] || (agg[key] = { name: l.name, unit: l.unit, daily:0, weekly:0, monthly:0, yearly:0 });
        Object.keys(periods).forEach(p => { if(periods[p](b.date)) a[p] += Number(l.qty) || 0; });
      });
    });
    const rows = Object.values(agg)
      .filter(a => (a.daily + a.weekly + a.monthly + a.yearly) > 0 && (!q || a.name.toLowerCase().includes(q)))
      .sort((x, y) => y[mode] - x[mode]);

    const cell = (a, p) => `<td class="${p === mode ? 'ku-hl' : ''}">${a[p] ? fmtQty(a[p]) + ' ' + esc(a.unit) : '—'}</td>`;
    body.innerHTML = rows.length ? rows.map(a => `<tr>
        <td><strong>${esc(a.name)}</strong></td>
        ${cell(a,'daily')}${cell(a,'weekly')}${cell(a,'monthly')}${cell(a,'yearly')}
      </tr>`).join('')
      : '<tr class="empty-row"><td colspan="5">No kitchen usage recorded for this period.</td></tr>';

    // bills log for the selected period
    const log = $('kitchenLogBody');
    if(log){
      const list = kitchenBills.filter(b => periods[mode](b.date) &&
        (!q || (b.items || []).some(l => l.name.toLowerCase().includes(q))));
      log.innerHTML = list.length ? list.map(b => `<tr>
        <td>${esc(b.billNo || '')}</td>
        <td>${formatDate(b.date)}</td><td>${formatTime(b.date)}</td>
        <td>${(b.items || []).map(l => esc(l.name) + ' ' + fmtQty(l.qty) + ' ' + esc(l.unit)).join(', ')}</td>
        <td>${esc(b.note || '—')}</td>
        <td>
          <button class="view-btn" onclick="kitchenPrintLog('${b.id}')" title="Print">🖨️</button>
          <button class="view-btn" onclick="kitchenEdit('${b.id}')" title="Edit">✏️</button>
          <button class="expense-del-btn" onclick="kitchenDelete('${b.id}')" title="Delete">🗑️</button>
        </td>
      </tr>`).join('') : '<tr class="empty-row"><td colspan="6">No kitchen bills in this period.</td></tr>';
    }
  };

  /* =================================================================
     Hook the new sections into the existing admin sidebar
     ================================================================= */
  Object.assign(ADMIN_SECTION_MAP, {
    inventory:     { sec:'secInventory',     nav:'adminNavInventory',     title:'Inventory / Stock' },
    purchase:      { sec:'secPurchase',      nav:'adminNavPurchase',      title:'Purchase' },
    kitchen:       { sec:'secKitchen',       nav:'adminNavKitchen',       title:'Kitchen Bill' },
    kitchenreport: { sec:'secKitchenReport', nav:'adminNavKitchenReport', title:'Kitchen Usage' }
  });
  const originalShow = window.showAdminSection;
  window.showAdminSection = function(name){
    originalShow(name);
    if(name === 'inventory')     renderInventory();
    if(name === 'purchase')      { renderPurchaseSelect(); renderPurchaseHistory(); }
    if(name === 'kitchen')       { renderKitchenGrid(); renderKitchenBill(); }
    if(name === 'kitchenreport') renderKitchenReport();
  };

  /* =================================================================
     5) LOW-STOCK NOTIFICATIONS  (shows in the bell at the top)
     Appears when an item reaches its "Warn me when below" number.
     The ✕ button hides it; it comes back only if the item runs out
     completely, or after you restock and it drops low again.
     ================================================================= */
  // Cancelled (✕) notifications are remembered ONLY while this page stays open.
  // After a refresh or logout/login they show again until stock is added.
  let dismissed = {};
  try{ localStorage.removeItem('alhamd_lowstock_dismissed'); }catch(e){}   // clean up the old saved version

  function severity(i){
    if(!(i.minQty > 0)) return null;     // no warning level set -> no notification
    if(i.qty <= 0) return 'out';
    if(i.qty <= i.minQty) return 'low';
    return null;
  }
  function lowStockList(){
    let changed = false;
    stockItems.forEach(i => { if(!severity(i) && dismissed[i.id]){ delete dismissed[i.id]; changed = true; } });
    return stockItems.filter(i => { const s = severity(i); return s && dismissed[i.id] !== s; });
  }

  window.lowStockDismiss = function(id){
    const i = findItem(id); if(!i) return;
    dismissed[id] = severity(i);
    NotificationSystem.refresh();
  };
  window.lowStockDismissAll = function(){
    lowStockList().forEach(i => { dismissed[i.id] = severity(i); });
    NotificationSystem.refresh();
  };

  if(typeof NotificationSystem !== 'undefined'){
    NotificationSystem.registerAlert({
      id: 'low-stock',
      check(){
        const list = lowStockList();
        return { active: list.length > 0, data: { count: list.length, items: list } };
      },
      render(data){
        const rows = data.items.map(i => {
          const out = severity(i) === 'out';
          return '<div class="stk-notif-row">' +
            '<div class="stk-notif-text"><strong>' + esc(i.name) + '</strong> — ' +
              (out ? '<span style="color:#c62828;font-weight:700;">finished (0 left)</span>' : esc(stockText(i)) + ' left') +
              '<div class="stk-notif-sub">Warning level: ' + fmtQty(i.minQty) + ' ' + esc(i.unit) + '</div></div>' +
            '<button class="stk-notif-x" title="Dismiss" aria-label="Dismiss" onclick="event.stopPropagation();lowStockDismiss(\'' + i.id + '\')">✕</button>' +
          '</div>';
        }).join('');
        return '<div class="notif-item">' +
          '<div class="notif-item-icon">📦</div>' +
          '<div class="notif-item-content">' +
            '<div class="notif-item-title">Low Stock Warning</div>' + rows +
            (data.items.length > 1 ? '<button class="stk-notif-all" onclick="event.stopPropagation();lowStockDismissAll()">Dismiss all</button>' : '') +
            '<div class="notif-item-recommend">Add more from the Purchase page.</div>' +
          '</div></div>';
      }
    });
  }

  // logging out and back in (no page refresh) also brings the warnings back
  if(typeof window.logout === 'function'){
    const originalLogout = window.logout;
    window.logout = function(){
      dismissed = {};
      const r = originalLogout.apply(this, arguments);
      if(typeof NotificationSystem !== 'undefined') NotificationSystem.refresh();
      return r;
    };
  }

  renderAll();
})();
