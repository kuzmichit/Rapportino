const promise = new Promise((resolve, reject) => {
  resolve('ok');
} )

const _baseURL = 'https://la-sceda-di-lavoro-default-rtdb.firebaseio.com';
const _pathToResource = 'rapportinoBorys';
const _URL = _baseURL + _pathToResource;

const getResourceFromDatabase = async (url = _URL, method = 'GET', body = null, headers = {'Content-Type': 'application/json'} ) => {

  try {
    const response = await fetch(url, {method, body, headers} );

    if (!response) {
      //throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    const data = await response.json();
    
    return data;
  }
  catch(e) {
    alert(e)
  }
};
