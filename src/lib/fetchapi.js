import Axios from 'axios';

const URL = (window.location.hostname === 'localhost') ? 'http://localhost/Kinoji/api/index.php' : 'https://kinoji.elkhantour.com/api/index.php' ;
const FetchAPI = {
  post: (param) => new Promise( (resolve,reject) => {
      Axios.post(URL, param).then( result => resolve(result) );
  })
}

export default FetchAPI;
