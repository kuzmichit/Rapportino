export function getForm() {

  const formLogin = document.getElementById('login-form');
  let btnGhost = formLogin['btn-ghost'];
  btnGhost.addEventListener('pointerdown', btnLoginHandler);
}

function UserData(name, pass) {
  this.name = name,
  this.pass = pass;
}

function saveUserDataInSessionStorage(userData) {
  localStorage.setItem('userData', JSON.stringify(userData) );
}

function btnLoginHandler() {

  const formLogin = document.getElementById('login-form');
  let userData = new UserData(formLogin.email.value, formLogin.password.value);
  saveUserDataInSessionStorage(userData);
  
  if(formLogin.email.value === '' || formLogin.password.value==='') {
    return; 
  }
  document.querySelector('.submit__button').style.display = '';
  document.querySelector('.modal__container').style.display = 'none';
  document.querySelector('.main__container').style = 'filter: blur(0)';
  
}

