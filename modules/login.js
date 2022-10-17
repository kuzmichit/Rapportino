import {validate} from './support.js'
export function getForm() {

  const formLogin = document.getElementById('login-form');
  let btnGhost = formLogin['btn-ghost'];
  btnGhost.addEventListener('pointerdown', btnLoginHandler);
}

function UserData(email, password) {
  this.email = email,
  this.password = password;
}

function saveUserDataInSessionStorage(userData) {
  localStorage.setItem('userData', JSON.stringify(userData) );
}

function btnLoginHandler() {

  const formLogin = document.getElementById('login-form');
  let email = formLogin.email.value,
      password = formLogin.password.value,
      expForMail = /(^\w+)@(\w+)\.[A-Za-z]{2,3}$/;
  
  if(!validate(email, expForMail)) {console.log(1111); return}
  if(validate(password)) console.log(222);
  let userData = new UserData(email, password);
  saveUserDataInSessionStorage(userData);
  
  document.querySelector('.submit__button').style.display = '';
  document.querySelector('.modal__container').style.display = 'none';
  document.querySelector('.main__container').style = 'filter: blur(0)';
  
}
