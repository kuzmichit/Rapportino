//import {renderModalSignIn} from './renders.js';

export function onBtnRegisterFormHandler(currentDate, evt) {
  let workForm = evt.target.form;
  console.log(workForm);
  
  const dataForSaveInDatabase = new CreateObjectForDatabase(currentDate, workForm);
  
  // let userData = getDataFromLoginForm();
}

function CreateObjectForDatabase(currentDate, form) {
  this[`${currentDate}`] =
      {
        building: form.building.value,
        description: form.description.value
      };
}

function authWithEmailAndPassword(userData) {
  const apiKey = 'AIzaSyDMLR1XYP9NpvZbXZbBxBLEWB1Ssx528ms';

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',

    body: {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    } ,
    headers: {
      'Content-Type': 'application/json'
    }
  } )
    .then(response => response.json() )
    .then(data => data.idToken);
}
const putScheduleInDatabase = idToken => {
  fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/test.json?auth=${idToken}`,
    {
      method: 'PATCH',
      body: JSON.stringify(new CreateObjectForDatabase() ),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => response.status)
    .then(console.log);
};
