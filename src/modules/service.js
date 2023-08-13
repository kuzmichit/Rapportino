const promise = new Promise((resolve, reject) => {
  resolve('ok');
} )

promise.then(console.log)

// const getResourceFromDatabase = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'} ) => {


//   try {
//     const response = await fetch(url, {method, body, headers} );

//     if (!response.ok) {
//       throw new Error(`Could not fetch ${url}, status: ${response.status}`);
//     }

//     const data = await response.json();

//     setLoading(false);
    
//     return data;
//   }
//   catch(e) {
//     setLoading(false);
//     setError(e.message);
//     throw e;
//   }
// };
// 