import {isValid, showError, dateFormat} from './support.js';
import { renderModalSignIn } from './renders.js';

export function btnRegisterFormHandler(currentDate, evt) {

  const workForm = evt.target.form,
    building = workForm.building.value,
    description = workForm.description.value,
    userData = JSON.parse(localStorage.getItem('userData') ),        
    workedHours = workForm.querySelector('.item_checked'),
    dateToView = currentDate.toLocaleString('it', dateFormat) + ' e ore fatte ' + workedHours.textContent;

  if(!workedHours) {
    alert('Scegli le ore effettuate');

    return;
  }
  else if(!isValid(building) ) {
    alert('Inserire il nome di cantiere valido');

    return;
  }
  else if(!isValid(description, /(\w|\s){10,}/) ) {
    alert('Inserire il lavoro svolto valido');

    return;
  }
      
  const dataForSaveInDatabase = new CreateObjectForDatabase(dateToView, building, description, workedHours.textContent);

  saveDataInLocalStorage(dataForSaveInDatabase, dateToView);
  //submitScheduleInDatabase(userData, dataForSaveInDatabase, currentDate);
 //getScheduleFromDatabase(userData);
}

function CreateObjectForDatabase(dateToView, building, description, workedHour) {
  this[`${dateToView}`] =
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
    mode: 'cors',
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
      if(response && response.error) throw response.error;

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

const submitScheduleInDatabase = (userData, dataForSaveInDatabase) => {
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
          let date = new Date(Object.keys(result)[0] ).toLocaleString('it', dateFormat);
          alert('La scheda del ' + date + ' è stata inserita');
        }
        )
        .catch(error => console.log(error.message) );
    } ); 
};

function saveDataInLocalStorage(data, dateToView) {
  console.log(dateToView);

  let rapportino = localStorage.getItem('rapportino');

  if (rapportino === null) localStorage.setItem('rapportino', '{}');
  rapportino = JSON.parse(localStorage.getItem('rapportino') );
  rapportino[dateToView] = {...data};
  localStorage.setItem('rapportino', JSON.stringify(rapportino) );
} 

function getScheduleFromDatabase(userData, currentDate) {

  authWithEmailAndPassword(userData)
    .then(idToken => fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`) )
    .then(response => response.json() )
    .then(console.log);
}

// function getRapportinoFromLocal() {
//   if(!localStorage.getItem('rapportino') ) localStorage.setItem('rapportino', '{}');
  
//   return localStorage.getItem('rapportino');
// }

