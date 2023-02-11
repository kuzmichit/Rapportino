import {checkFillField, isValid, showError, dateFormat, getRapportinoFromLocal, checkHoursOverflow} from './support.js';
import { renderModalSignIn } from './renders.js';


export function btnRegisterFormHandler(currentDate, evt) {
  
  const workForm = evt.target.form,
        userData = JSON.parse(localStorage.getItem('userData') ),
        dateFormatted = currentDate.toLocaleString('it', dateFormat);

    const dataForm = {
    building : workForm.building.value,
    description : workForm.description.value,           
    workedHours :  workForm.querySelector('.hour.item_checked') && 
                  workForm.querySelector('.hour.item_checked').textContent
   }

  const dataForSaveInDatabase = new CreateObjectForDatabase(dateFormatted, dataForm);

  if(!checkFillField(dataForm)) return;
   
  
  const idToken = authWithEmailAndPassword(userData)
        idToken.then(idToken =>  getScheduleFromDatabase(idToken) )
        // controllo se si puo memorizzare la scheda
        .then(data =>  { 
          if(checkHoursOverflow(data, dateFormatted, dataForm)) { 
            idToken.then(token => submitScheduleInDatabase(dataForSaveInDatabase, dateFormatted, token))
            .then(saveDataInLocalStorage(dataForSaveInDatabase, dateFormatted) )
            .then(workForm.reset())
            return;
        } } ) 
}

function CreateObjectForDatabase(date, {building, description, workedHours}) {

  this[`${date}`] =
     {
        building,
        description,
        workedHours,
      }
}

function authWithEmailAndPassword(userData) {
  const apiKey = 'AIzaSyDMLR1XYP9NpvZbXZbBxBLEWB1Ssx528ms';

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    // mode: 'cors',
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
    .then(data => {
      return data.idToken
    } )
    .catch(error => {

      if(400 <= error.code && 500 > error.code) {
        showError(error.message);
        renderModalSignIn();
      } 
    }
    );
}

const submitScheduleInDatabase = (dataForSaveInDatabase, dateFormatted, idToken) => {
     
      fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`,
        {
          method: 'PATCH',
          body: JSON.stringify(dataForSaveInDatabase),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(console.log(dataForSaveInDatabase))
        .then(response => response.json() )
        .then(result => {
         
          alert('La scheda del ' + dateFormatted + ' è stata inserita');
        }
        )
        .catch(error => console.log(error.message) );
    }; 
//};

function saveDataInLocalStorage(data, dateFormatted) {
  let rapportino = JSON.parse(getRapportinoFromLocal())
  
  rapportino[dateFormatted] = {...data[dateFormatted]};
  localStorage.setItem('rapportino', JSON.stringify(rapportino) );
} 

function getScheduleFromDatabase(idToken) {

  return fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`)
    .then(response => response.json() )
    .catch(error => console.log(error.message) );
    // .then( data => { return data
    //   // for( let key in data) {
    //   //   if(key.includes('14 novembre 2022'))
    //   //   console.log(data[key]['workedHours']);
    //   // } 
    // } )
}
