const calendar = document.querySelector('.get-data');

export const calendarsElements = {	
  buttonRight: calendar.querySelector('.button__right'),
  buttonLeft: calendar.querySelector('.button__left'),
  targetCurrent: calendar,
  month: calendar.querySelector('.month'),
  nameBuildingInput: calendar.querySelector('.name-building__input'),
  textArea: calendar.querySelector('#desc'),
  placeToInsert: calendar.querySelector('.list__day'),
  listHour: calendar.querySelector('.list__hour'),
  inputHour: calendar.querySelector('.input__hour'),
  listHourContainer: calendar.querySelector('.list__hour-container')
};

export function camellizeClass(nameClass) {
  let str = nameClass;

  str = str.split('-').join().split(/_{1,2}/).join().split(',');
  let camellizeStr = str[0];

  for (let i = 1; i < str.length; i++) {
    camellizeStr += (str[i][0].toUpperCase() + str[i].slice(1) );
  }

  return camellizeStr;
}

export function deleteNode(collection) {
  while(collection.firstChild) {
    collection.firstChild.remove();
  }
}

export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Function]';
};

export function isUserDataInLocalStorage() {
  return localStorage.getItem('userData') ? true : false;
}

export function isValid(str, regExp = /(\w+\b){1,}/g) {
  return regExp.test(str)?true:false;        
}

export function showError(message) {

  switch (message) {
  case 'EMAIL_NOT_FOUND':
    alert('La email non corretta, inserire nuovamente');
    break;      
  case 'INVALID_PASSWORD':
    alert('La password non corretta, inserire nuovamente');

    break;
  case ' "TOO_MANY_ATTEMPTS_TRY_LATER':
    alert('Fatti troppi tentativi, devi riprovare più tardi');
    break;
  default: 
    alert('Errore generico prova a rifare più tardi');
  }
}

export const dateFormat = {
  dateStyle: 'long',
  timeStyle: 'medium',
}; 

export function getRapportinoFromLocal() {

  if(localStorage.getItem('rapportino') === null)  localStorage.setItem('rapportino', '{}');
  let rapportino = localStorage.getItem('rapportino')

  return rapportino;
}

  // for (const key in rapportino) {
  //       if(regExp.test(key)) {
  //       let firstKey = Object.keys(rapportino[key] );
  //       tmpHours += +rapportino[key][firstKey]['workedHours'];
  //       console.log( tmpHours);
  //   }
  // }
// }

export function checkFillField({workedHours, building, description}) {
    if(!workedHours) {
      return alert('Scegli le ore effettuate');
    }
    else if(!isValid(building) ) {
      return alert('Inserire il nome di cantiere valido');
    }
    else if(!isValid(description, /(\w|\s){10,}/) ) {
      return alert('Inserire il lavoro svolto valido');
    }
    else return true;
  }

function isIncludingCurrentDate(rapportino, dateForCompare) {
    
    if(rapportino && JSON.stringify(rapportino).includes(dateForCompare)) return true;
}

export function checkHoursOverflow(rapportino, dateFormatted, {workedHours}) {
  debugger;
  const dateForCompare = dateFormatted.slice(0, (dateFormatted.indexOf(202) + 4))
  debugger;

  if (!isIncludingCurrentDate(rapportino, dateForCompare)) return true;

  let rapParsed = rapportino;
  let tmpHours = +workedHours;

    for (let key in rapParsed) {
        if( key.includes(dateForCompare) ) {
        tmpHours += +rapParsed[key]['workedHours'];
        }
    }
  if(tmpHours >= 12) {
    alert('E stato superato il limite delle ore' );
    return false;
  }
  return true;
}