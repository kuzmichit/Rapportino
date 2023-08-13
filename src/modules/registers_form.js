import {checkFillField, isValid, showError, dateFormat, getRapportinoFromLocal, checkHoursOverflow, errorMessage, showReport} from './support.js';
import { renderModalSignIn } from './renders.js';
import {asyncConfirm, ConfirmBox}  from './modal.js';


export async function btnRegisterFormHandler(currentDate, evt) {

  const workForm = evt.target.form,
        userData = JSON.parse(localStorage.getItem('userData') ),
        dateFormatted = currentDate.toLocaleString('it', dateFormat),
        currentMonth = currentDate.toLocaleString('it', { month: "long"} );
  
 

    const dataForm = {
    building : workForm.building.value,
    description : workForm.description.value,           
    workedHours : workForm.querySelector('.hour.item_checked') && 
                  workForm.querySelector('.hour.item_checked').textContent
   }

  const dataForSaveInDatabase = new CreateObjectForDatabase(dateFormatted, dataForm);
  
  if(!checkFillField(dataForm)) return;

  const optionConfirm = {
    title:"Registrare la scheda?",
    messageBody: 'Cantiere: ' + dataForm.building,
    messageWorkedHour:'Ore effettuate: ' + dataForm.workedHours,
    yes: 'Si'
  } 
  try{
  const idToken = await authWithEmailAndPassword(userData) 
  if(!idToken) return;
  
  const currentData = await getScheduleFromDatabase(idToken, currentMonth)
        //controllo se si puo memorizzare la scheda
        .then(data =>  { if(checkHoursOverflow(data, dateFormatted, dataForm) )  {
          
        renderConfirm(optionConfirm, dataForSaveInDatabase, dateFormatted, currentMonth, idToken, workForm); 
        } } ) 
  }      
  catch(e) { alert('La scheda non salvata') }
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
        showError(error.message, ConfirmBox);
        renderModalSignIn();
      } 
    }
    );
}

const submitScheduleInDatabase = (dataForSaveInDatabase, dateFormatted, currentMonth, idToken, workForm) => {
       fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com//rapportinoBorys/${currentMonth}.json?auth=${idToken}`,
        {
          method: 'PATCH',
          body: JSON.stringify(dataForSaveInDatabase),
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        showReport(dateFormatted, workForm);
        } )
         .catch((e) => errorMessage(ConfirmBox, {messageBody: e = 'Qualcosa non va, riprova più tardi'  } ) );
    }; 

function saveDataInLocalStorage(data, dateFormatted) {
  let rapportino = JSON.parse(getRapportinoFromLocal())
  
  rapportino[dateFormatted] = {...data[dateFormatted]};
  localStorage.setItem('rapportino', JSON.stringify(rapportino) );
} 

function getScheduleFromDatabase(idToken, currentMonth) {

  return fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/rapportinoBorys/${currentMonth}.json?auth=${idToken}`)
    .then(response => response.json() )
    .catch(error => alert(error.message) );
 }

// async function showReport (dateFormatted, workForm) {
//   if(await asyncConfirm(
//    {title: 'Tutto ok', 
//    messageBody: 'La scheda del ' + dateFormatted + ' è stata inserita',
//    remove: (node) => node.remove(),
//    }
//    ) )
//    workForm.submit()
// }

const renderConfirm = async (optionConfirm, dataForSaveInDatabase, dateFormatted, currentMonth, idToken, workForm) => {

  if (await asyncConfirm(optionConfirm, workForm) ) {
    submitScheduleInDatabase(dataForSaveInDatabase, dateFormatted, currentMonth, idToken, workForm)
    saveDataInLocalStorage(dataForSaveInDatabase, dateFormatted) 
  };

}
