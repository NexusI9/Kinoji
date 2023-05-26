import Axios from 'axios';

const useAPI = () => {

  const LOCAL_URL = 'http://localhost/Kinoji/Webapp/public/api/index.php';
  const SERVER_URL = 'https://kinoji.elkhantour.com/api/index.php';

  const URL = (typeof window !== "undefined" && window.location.hostname === 'localhost') ? LOCAL_URL : SERVER_URL;
  
  return({
      post: (param) => new Promise( (resolve,reject) => {
          Axios.post(URL, param).then( result => resolve(result) );
      }),
      fetch: (param) => fetch(LOCAL_URL, {
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: typeof param === "string" ? JSON.stringify({type:param}) : JSON.stringify(param)
      }).then( data => data.json()).then( data => data)
    });
}


export default useAPI;