import qs from 'query-string';

export function shuffle_array(ar){
      return ar.sort( () => Math.random() - 0.5);
  }

export function jobFullName(job){
  return job === 'dop' ? 'Director of Photography' : job === 'artdir' ? 'Art Director' : job;
}

export function randomInt(mn, mx) { // min and max included
    mn = parseInt(mn);
    mx = parseInt(mx);
    return  Math.floor(Math.random() * (mx - mn + 1) + mn) ;
  }

export function paramsToArray(str){ return str ? [...str.split(' ')] : null };
export function sortThumbnails(ar){
  return ar.sort((a, b) => {
    function cleanName(item){

      const isChiffre = item[item.length-2] === '_';
      let newName = item;

      if(isChiffre){
        newName = newName.split('');
        newName.splice(item.length-1,0,'0' );
        newName = newName.join('');
      }
      newName = newName.slice(-2);

      return newName;
    }
    return cleanName(a) - cleanName(b);
  });
}

export function move (ar, from, to) {
      return ar.splice(to, 0, ar.splice(from, 1)[0]);
};




export function hasHistory(ctr, cat=null){

			if(!Array.isArray(ctr)){ return false; }
			if( cat ){
				if(ctr.length > 0 && ctr[0].history && ctr[0].history[cat] && ctr[0].history[cat].length > 0){ return true; }
			}else{
        if( ctr.length > 0 && ctr[0].history){ return true; }
      }
			return false;
}

export function getMovieYear(mv){
  return  mv.date ? parseInt(mv.date.split('-')[0]) : '';
}

export function setEventDate(item){
			if(!item.end){ return item.begin; }
			if(item.begin && item.end){ return  item.begin+'-'+item.end; }
			return '';
}

export function GET_DIRECTORDate(dir){
  if(!dir.deathday && dir.birthday){ return dir.birthday.split('-')[0]; }
  else if(dir.birthday && dir.deathday){ return  dir.birthday.split('-')[0]+'-'+dir.deathday.split('-')[0]; }
  return '';
}


export function truncate(str, n){
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
}


export function firstSentenceOf(str){
  try{
    str = str.match(/^.*?[\.!\?](?:\s|$)/)[0]
    return str;
  }catch{
    return str;
  }
}

export function setTagArray(ob){
  /*
    {
    Array (array)
    Value (string)
    Action (remove/add)
  }
  */
  const index = ob.array.indexOf(ob.value);
  if(ob.action === 'remove' && index >= 0){ ob.array.splice(index,1); }
  else if( ob.action === 'add' && index < 0){ ob.array.push(ob.value); }

  return ob.array;

}

export function setParam(location, param){
  const queryParams =  qs.parse(location.search);
  return {...queryParams, ...param } ;
}


export function scrollReachBottom(obj){
  return obj.scrollTop === (obj.scrollHeight - obj.offsetHeight);
}

export function removeUndefined(obj){
  Object.keys(obj).forEach( key => obj[key] === undefined && delete obj[key]);
  return obj;

}