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
  inputHour: calendar.querySelector('.input__hour')
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
  dateStyle: 'short',
  timeStyle: 'medium'
}; 

// export function checkHoursOver(rapportino, dateFormatted, workedHours) {

//   console.log('fired');
//   return true;
//   // let tmpHours = workedHours;
//   // let regExp = /7\/11\/2022/;

//   // if(dataToView in rapportino) {    
//   //   for (let key in rapportino) {
//   //     //formare regExp
//   //       if( in rapportino[key]) {
//   //       tmpHours += +rapportino[key][dataToView]['workedHours'];
//   //       debugger;
//   //       }
//   //   }
//   // }
  
//   // if(tmpHours > 12) alert('E stato superato il limite delle ore' );
// }

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

function isIncludingCurrentDate(rapportino, dateFormatted) {
    if(rapportino && rapportino.includes(dateFormatted.slice(0, 8) )) return true;
}

export function checkHoursOverflow(rapportino, dateFormatted, {workedHours}) {

  if (!isIncludingCurrentDate(rapportino, dateFormatted)) return true;

  let rapParsed = JSON.parse(rapportino)
  let tmpHours = +workedHours;

    for (let key in rapParsed) {
        if( key.includes(dateFormatted.slice(0, 8) ) ) {
        tmpHours += +rapParsed[key]['workedHours'];
        }
    }
  if(tmpHours >= 12) {
    alert('E stato superato il limite delle ore' );
    return false;
  }
  return true;
}