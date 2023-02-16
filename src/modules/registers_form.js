import {checkFillField, isValid, showError, dateFormat, getRapportinoFromLocal, checkHoursOverflow, showModal} from './support.js';
import { renderModalSignIn } from './renders.js';
import renderConfirm  from './modal.js';


export function btnRegisterFormHandler(currentDate, evt) {

  const workForm = evt.target.form,
        userData = JSON.parse(localStorage.getItem('userData') ),
        dateFormatted = currentDate.toLocaleString('it', dateFormat),
        currentMonth = currentDate.toLocaleString('it', { month: "long"} );
  
 

    const dataForm = {
    building : workForm.building.value,
    description : workForm.description.value,           
    workedHours :  workForm.querySelector('.hour.item_checked') && 
                  workForm.querySelector('.hour.item_checked').textContent
   }

  const dataForSaveInDatabase = new CreateObjectForDatabase(dateFormatted, dataForm);
  
  if(!checkFillField(dataForm)) return;

  const optionConfirm = {
    title:"Registrare la scheda?",
    messageDate: dateFormatted,
    messageWorkedHour:'Ore effettuate: ' + dataForm.workedHours ,
    yes:"Yes",
    no:"NO",
    } 
  
  const idToken = authWithEmailAndPassword(userData)
        idToken.then(idToken =>  getScheduleFromDatabase(idToken, currentMonth) )
        // controllo se si puo memorizzare la scheda
        .then(data =>  { 
          if(checkHoursOverflow(data, dateFormatted, dataForm) )  { renderConfirm(optionConfirm)
            // idToken.then(token => submitScheduleInDatabase(dataForSaveInDatabase, dateFormatted, currentMonth, token))
            // .then(saveDataInLocalStorage(dataForSaveInDatabase, dateFormatted) )
            // .then(workForm.submit() )
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

const submitScheduleInDatabase = (dataForSaveInDatabase, dateFormatted, currentMonth, idToken) => {
     
      fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys/${currentMonth}.json?auth=${idToken}`,
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

function getScheduleFromDatabase(idToken, currentMonth) {

  return fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys/${currentMonth}.json?auth=${idToken}`)
    .then(response => response.json() )
    .catch(error => console.log(error.message) );
    // .then( data => { return data
    //   // for( let key in data) {
    //   //   if(key.includes('14 novembre 2022'))
    //   //   console.log(data[key]['workedHours']);
    //   // } 
    // } )
}
