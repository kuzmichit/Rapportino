import {isValid, showError} from './support.js';
import { renderModalSignIn } from './renders.js';

export function btnRegisterFormHandler(currentDate, evt) {
  const workForm = evt.target.form,
    building = workForm.building.value,
    description = workForm.description.value,
    userData = JSON.parse(localStorage.getItem('userData') ),        
    workedHour = workForm.querySelector('.item_checked');

  if(!workedHour) {
    alert('Scegli le ore effettuate');

    return;
  }
  if(!isValid(building) ) {
    alert('Inserire il nome di cantiere valido');

    return;
  }
  if(!isValid(description, /(\w|\s){10,}/) ) {
    alert('Inserire il lavoro svolto valido');

    return;
  }
      
  const dataForSaveInDatabase = new CreateObjectForDatabase(currentDate, building, description, workedHour.textContent);
  
  saveDataInLocalStorage(dataForSaveInDatabase, currentDate);
  putScheduleInDatabase(userData, dataForSaveInDatabase, currentDate);
}

function CreateObjectForDatabase(currentDate, building, description, workedHour) {
  this[`${currentDate}`] =
      {
        building,
        description,
        workedHour
      };
}

function authWithEmailAndPassword(userData) {
  const apiKey = 'AIzaSyDMLR1XYP9NpvZbXZbBxBLEWB1Ssx528ms';

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify( {
      email:userData.email,
      password: userData.password,
      returnSecureToken: true
    } ) ,
    headers: {
      'Content-Type': 'application/json'
    }
  } )
    .then(response => response.json() )
    .then(response => {
      if(response.error) throw response.error;

      return response;
    } 
    )
    .then(data => data.idToken)
    .catch(error => {

      if(400 <= error.code && 500 > error.code) {
        showError(error.message);
        renderModalSignIn();
      } 
    }
    );
}

const putScheduleInDatabase = (userData, dataForSaveInDatabase, currentDate) => {
  authWithEmailAndPassword(userData)
    .then(idToken => {
      
      fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`,
        {
          method: 'PATCH',
          body: JSON.stringify(dataForSaveInDatabase),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => response.json() )
        .then(result => {
          let date = Object.keys(result)[0];
          alert('La scheda del ' + date + ' è stata inserita');
        }
        )
        .catch(error => console.log(error.message) );
    } ); 
};

function getScheduleFromDatabase(email, password) {

  authWithEmailAndPassword('zucca@gmail.com', 123456)
    .then(idToken => fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/test.json?auth=${idToken}`) )
    .then(response => response.json() )
    .then(console.log);
}

function saveDataInLocalStorage(data, currentDate) {

  let rapportino = localStorage.getItem('rapportino');

  if (rapportino === null) localStorage.setItem('rapportino', '{}');
  rapportino = JSON.parse(localStorage.getItem('rapportino') );
  rapportino[currentDate] = data;
  localStorage.setItem('rapportino', JSON.stringify(rapportino) );
} 

function getRapportinoFromLocal() {
  if(!localStorage.getItem('rapportino') ) localStorage.setItem('rapportino', '{}');
  
  return localStorage.getItem('rapportino');
}

