/* =====================================================================
   DELETE ACCESS CONTROL
   - ONLY the main admin "Zaid" (SECOND_ADMIN_ACCOUNT) can delete anything.
   - Owner and Salesman can add / edit, but every delete is blocked and
     every delete button is hidden for them.
   - The old 4-digit PIN system has been removed completely.

   Every delete in script.js / inventory.js already goes through the two
   helpers below, so this one file controls all of them.
   ===================================================================== */
(function(){

  /* true only when Zaid is signed in */
  function canDelete(){
    return typeof currentOwnerAccountRef !== 'undefined' &&
           typeof SECOND_ADMIN_ACCOUNT !== 'undefined' &&
           currentOwnerAccountRef === SECOND_ADMIN_ACCOUNT;
  }
  window.canDelete = canDelete;

  function denied(){
    alert('Only the main admin (Zaid) can delete. You can add and edit, but not delete.');
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

  /* hide every delete button unless Zaid is signed in */
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