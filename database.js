/* ── db.js ── */
var DB = {
  users:    JSON.parse(localStorage.getItem('ap_users')    || '[]'),
  sessions: JSON.parse(localStorage.getItem('ap_sessions') || '[]')
};

function dbSave(){
  localStorage.setItem('ap_users',    JSON.stringify(DB.users));
  localStorage.setItem('ap_sessions', JSON.stringify(DB.sessions));
}

function dbFindUser(email){
  var e = email.toLowerCase().trim();
  for(var i=0; i<DB.users.length; i++){ 
      if(DB.users[i].email === e) return DB.users[i]; 
  }
  return null;
}

// ... e as outras funções de insert e hash
