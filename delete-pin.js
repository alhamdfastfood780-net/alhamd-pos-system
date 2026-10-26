/* =====================================================================
   DELETE ACCESS CONTROL
   - The Owner (Zeeshan Bhatti) and the Admin can both delete anything.
   - The Salesman can add / edit, but every delete is blocked and every
     delete button is hidden for him.
   - The Admin login stays hidden from the Owner exactly as before:
     the Owner never sees the Admin's username, password or settings.
   - The old 4-digit PIN system has been removed completely.

   Every delete in script.js / inventory.js already goes through the two
   helpers below, so this one file controls all of them.
   ===================================================================== */
(function(){

  /* true when the Owner or the Admin is signed in (Salesman = false) */
  function canDelete(){
    if(typeof currentOwnerAccountRef === 'undefined' || !currentOwnerAccountRef) return false;
    return (typeof OWNER_ACCOUNT !== 'undefined' && currentOwnerAccountRef === OWNER_ACCOUNT) ||
           (typeof SECOND_ADMIN_ACCOUNT !== 'undefined' && currentOwnerAccountRef === SECOND_ADMIN_ACCOUNT);
  }
  window.canDelete = canDelete;

  function denied(){
    alert('Only the Owner can delete. You can add and edit, but not delete.');
  }

  /* delete that had NO confirmation box before */
  window.requireDeletePin = function(title, message, onOk, icon){
    if(!canDelete()){ denied(); return; }
    onOk();
  };

  /* delete that shows a confirmation box */
  window.guardedConfirm = function(title, message, okLabel, onOk, icon){
    if(!canDelete()){ denied(); return; }
    showConfirmModal(title, message, okLabel, onOk, icon);
  };

  /* show delete buttons for Owner/Admin, hide them for the Salesman */
  function applyDeleteAccess(){
    document.body.classList.toggle('no-delete', !canDelete());
  }
  window.applyDeleteAccess = applyDeleteAccess;

  /* re-apply after login and logout */
  const origLogin = window.handleLogin;
  if(typeof origLogin === 'function'){
    window.handleLogin = function(){
      const r = origLogin.apply(this, arguments);
      applyDeleteAccess();
      return r;
    };
  }
  const origLogout = window.logout;
  if(typeof origLogout === 'function'){
    window.logout = function(){
      const r = origLogout.apply(this, arguments);
      applyDeleteAccess();
      return r;
    };
  }

  /* page refresh (session restored) */
  applyDeleteAccess();
})();
