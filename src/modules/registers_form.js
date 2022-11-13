import {checkFillField, isValid, showError, dateFormat, getRapportinoFromLocal, checkHoursOverflow} from './support.js';
import { renderModalSignIn } from './renders.js';


export function btnRegisterFormHandler(currentDate, evt) {
  
  const workForm = evt.target.form,
        userData = JSON.parse(localStorage.getItem('userData') ),
        dateFormatted = currentDate.toLocaleString('it', dateFormat),
        rapportino = getRapportinoFromLocal();
  
    const data = {
    building : workForm.building.value,
    description : workForm.description.value,           
    workedHours : workForm.querySelector('.input__hour').value || workForm.querySelector('.hour.item_checked') && 
                  workForm.querySelector('.hour.item_checked').textContent
   }

   console.log(data);
   const dataForSaveInDatabase = new CreateObjectForDatabase(dateFormatted, data);

  if(!checkFillField(data)) return;

  // controllo se si puo memorizzare la scheda
  if(checkHoursOverflow(rapportino, dateFormatted, data)) { 

      console.log('insert');
      saveDataInLocalStorage(dataForSaveInDatabase, dateFormatted);
    }
   
    
//   //submitScheduleInDatabase(userData, dataForSaveInDatabase, currentDate);
//  //getScheduleFromDatabase(userData);
//   // getRapportinoFromLocal();
// }
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

function saveDataInLocalStorage(data, dateFormatted) {
  let rapportino = JSON.parse(getRapportinoFromLocal())
  
  rapportino[dateFormatted] = {...data[dateFormatted]};
  localStorage.setItem('rapportino', JSON.stringify(rapportino) );
} 

function getScheduleFromDatabase(userData, currentDate) {

  authWithEmailAndPassword(userData)
    .then(idToken => fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys.json?auth=${idToken}`) )
    .then(response => response.json() )
    .then(console.log);
}

// function getRapportinoFromLocal() {
//   let rapportino = JSON.parse(localStorage.getItem('rapportino'));
//   let regExp = /7\/11\/2022/g; 
//   let tmpHours = 0;
  
//   for (const key in rapportino) {
//         if(regExp.test(key)) {
//         let firstKey = Object.keys(rapportino[key] );
//         tmpHours += +rapportino[key][firstKey]['workedHours'];
//         console.log( tmpHours);
//     }
//   }
// }