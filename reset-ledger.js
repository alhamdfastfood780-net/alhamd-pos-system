/* =====================================================================
   RESET LEDGER
   Deletes ALL sales bills and ALL expense bills from the Firebase
   database (collections "sales" and "expenses"), so every ledger,
   dashboard total and report goes back to zero.

   It does NOT touch: menu items, prices, categories, stock/inventory,
   purchases, kitchen usage, or login settings.

   Only the Owner / Admin can use it, and they must type RESET first.
   ===================================================================== */
(function(){

  function setMsg(text, color){
    var el = document.getElementById('resetLedgerMsg');
    if(el){ el.textContent = text; el.style.color = color || '#8a8a8a'; }
  }

  /* delete every document of a collection, 400 at a time */
  async function wipeCollection(col){
    var total = 0;
    while(true){
      var snap = await col.limit(400).get();
      if(snap.empty) break;
      var batch = db.batch();
      snap.docs.forEach(function(d){ batch.delete(d.ref); });
      await batch.commit();
      total += snap.size;
    }
    return total;
  }

  window.resetLedger = async function(){
    if(typeof canDelete === 'function' && !canDelete()){
      alert('Only the Owner can reset the ledger.');
      return;
    }
    var input = document.getElementById('resetLedgerConfirm');
    if(!input || input.value.trim() !== 'RESET'){
      setMsg('Type RESET in the box first.', '#c62828');
      return;
    }
    if(!confirm('This will permanently delete ALL sales bills and ALL expense bills. Menu items are kept. This cannot be undone. Continue?')){
      return;
    }
    var btn = document.getElementById('resetLedgerBtn');
    if(btn) btn.disabled = true;
    setMsg('Deleting… please wait and do not close this page.', '#b08900');
    try{
      var s = await wipeCollection(salesCollection);
      var e = await wipeCollection(expensesCollection);
      input.value = '';
      setMsg('Done. Deleted ' + s + ' bills and ' + e + ' expenses. Every ledger is now zero.', '#2e7d32');
      if(typeof renderOwnerDashboard === 'function') renderOwnerDashboard();
    }catch(err){
      console.error('Reset ledger failed:', err);
      setMsg('Failed: ' + (err && err.message ? err.message : err) + ' (check your Firestore rules / connection)', '#c62828');
    }
    if(btn) btn.disabled = false;
  };
})();
