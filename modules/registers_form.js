export function onBtnRegisterFormHandler(currentDate, evt) {
  const workForm = evt.target.form;
  const userData = JSON.parse(localStorage.getItem('userData') );
  let workHours = workForm.querySelector('.item_checked').textContent || workForm.querySelector('.input__hour' || alert('Inserire le ore di lavoro') );
  const dataForSaveInDatabase = new CreateObjectForDatabase(workHours, currentDate, workForm);
  //putScheduleInDatabase(userData, dataForSaveInDatabase);
  //saveDataInLocalStorage(dataForSaveInDatabase, currentDate);
  console.log(dataForSaveInDatabase);
}

function CreateObjectForDatabase(workHours, currentDate, form) {
  this[`${currentDate}`] =
      {
        workHours,
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
      email:userData.email,
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
  console.log(11);
  authWithEmailAndPassword(userData)
    .catch(err => console.log(err) )
    .then(idToken => {
      //if (!idToken) { return console.log(Error.message); }
      
      fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`,
        {
          method: 'PATCH',
          body: JSON.stringify(dataForSaveInDatabase),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .catch(error => console.log(error) );
    } )
    .then(response => response);
  // .catch(error => console.log(error.message));
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
  else rapportino = JSON.parse(localStorage.getItem('rapportino') );
  rapportino[currentDate] = data;
  localStorage.setItem('rapportino', JSON.stringify(rapportino) );
	 } 

function getRapportinoFromLocal() {
  return localStorage.getItem('rapportino');
}

