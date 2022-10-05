export const registraLaScheda = () => {
  let btnGhost = document.querySelector('.btn-ghost');
  btnGhost.addEventListener('pointerdown', btnLoginHandler);
};

export function btnLoginHandler() {
  const form = document.querySelector('.login-form');

  const dataForm = new FormData(form);
  const [email,password] = [ dataForm.get('username'), dataForm.get('password') ];
  // putScheduleInDatabase();
  // getScheduleFromDatabase();

}

function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyDMLR1XYP9NpvZbXZbBxBLEWB1Ssx528ms';

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',

    body: JSON.stringify( {
      email,
      password,
      returnSecureToken: true
    } ),
    headers: {
      'Content-Type': 'application/json'
    }
  } )
    .then(response => response.json() )
    .then(data => data.idToken);
}

function getScheduleFromDatabase(email, password) {

  authWithEmailAndPassword('zucca@gmail.com', 123456)
    .then(idToken => fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/test.json?auth=${idToken}`) )
    .then(response => response.json() )
    .then(console.log);
}
export function putScheduleInDatabase(currentDate) {

  const date = new Date();
  const hour = document.querySelectorAll('.hour');
  const formRegisterSchedule = document.querySelector('.get-data');

  const dataForSaveInDatabase = {
    [`${date}`]:
      {
        nameBuilding: formRegisterSchedule.building.value,
        description: formRegisterSchedule.description.value,
      }
  };
 
  for (let item of hour) {
    if(item.classList.contains('item_checked') )
      dataForSaveInDatabase[date].hour = item.textContent;
  }

  fetch('https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/test.json', {
    method: 'PATCH',
    body: JSON.stringify(dataForSaveInDatabase),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
    .then(response => response.status)
    .then(console.log);
}

// authWithEmailAndPassword('zucca@gmail.com', 123456)
//   .then(idToken => fetch(`https://la-sceda-di-lavoro-default-rtdb.firebaseio.com/test.json?auth=${idToken}`, {
//     method: 'PUT',
//     body: JSON.stringify(dataForSaveSchedule),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   ) )
//   .then(response => response)
//   .then(console.log);

