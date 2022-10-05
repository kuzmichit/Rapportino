export function getForm() {

  const formLogin = document.getElementById('login-form');
  let btnGhost = formLogin['btn-ghost'];
  btnGhost.addEventListener('pointerdown', btnLoginHandler);
}

function UserData(name, pass) {
  this.name = name,
  this.pass = pass;
}

function saveUserDataInSessionStorage(dataUser) {
  localStorage.setItem('dataUser', JSON.stringify(dataUser) );
}

function btnLoginHandler() {

  const formLogin = document.getElementById('login-form');
  let dataUser = new UserData(formLogin.email.value, formLogin.password.value);
  saveUserDataInSessionStorage(dataUser);
  
  if(formLogin.email.value === '' || formLogin.password.value==='') {

    return; 
  }
  document.querySelector('.submit__button').style.display = '';
  document.querySelector('.modal__container').style.display = 'none';
  document.querySelector('.main__container').style = 'filter: blur(0)';
  
}

