//import {renderModalSignIn} from './renders.js';
//import {renderModalSignIn} from './renders.js';

export function onBtnRegisterFormHandler(currentDate, evt) {
  const workForm = evt.target.form;
  const userData = JSON.parse(localStorage.getItem('userData') );
  const dataForSaveInDatabase = new CreateObjectForDatabase(currentDate, workForm);
  putScheduleInDatabase(userData, dataForSaveInDatabase);
}

function CreateObjectForDatabase(currentDate, form) {
  this[`${currentDate}`] =
      {
        building: form.building.value,
        description: form.description.value
      };
}

function authWithEmailAndPassword(userData) {
  const apiKey = 'AIzaSyDMLR1XYP9NpvZbXZbBxBLEWB1Ssx528ms'
  ;

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify( {
      email:userData.emai,
      password: userData.password,
      returnSecureToken: true
    } ) ,
    headers: {
      'Content-Type': 'application/json'
    }
  } )
    .then(response => response.json() )
    .then(data => data.idToken);

}

const putScheduleInDatabase = (userData, dataForSaveInDatabase) => {
  authWithEmailAndPassword(userData)
    .then(response => console.log(response) )
    .then(idToken => {
      if (!idToken) { return console.log(Error.message); }
      
      return fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`,
        {
          method: 'PATCH',
          body: JSON.stringify(dataForSaveInDatabase),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ); 
    } )
    .then(response => response.status);
};

function getScheduleFromDatabase(email, password) {

  authWithEmailAndPassword('zucca@gmail.com', 123456)
    .then(idToken => fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/test.json?auth=${idToken}`) )
    .then(response => response.json() )
    .then(console.log);
}