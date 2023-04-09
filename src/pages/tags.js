import { useState, useEffect } from 'react';
import { TagBox, Counter } from '@/components/tags';
import useAPI from '@/lib/api';

function Tags(){

  const [ tagBox, setTagBox ] = useState([]);
  const [ results, setResults ] = useState({});
  const [ tagChain, setTagChain ] = useState([]);
  const [ colourChain, setColourChain ] = useState([]);

  const spliceTitle = (array,limit) => {

     if(array.length > limit){ array = array.splice(0,limit); }
     return array.map(movie => movie.title);

  }

  const onChange = (val) => {
    switch(val.type){
      case 'tag':
        setTagChain([...val.actives]);
      break;

      case 'colour':
        setColourChain([...val.actives]);
      break;

      default:
    }

  }


  useEffect(() => {

  	document.title = "KINO寺 - Tags";

    const setTotalResult = (colourchain, tagchain, tagresult, colourresult) => {

      if(tagchain.length > 0 && colourchain.length === 0){ return tagresult.length; }
      else if( colourchain.length > 0 && tagchain.length === 0 ){ return colourresult.length; }
      else if ( (tagchain.length && colourchain.length) > 0){
        // only keep common id
        return tagresult.filter( tag => {
          for(const movieId of colourresult){ if(movieId === tag.id){ return true; } }
          return false;
        }).length;
      }

      return 0;
    }

    //set Tax Boxes
    const {post} = useAPI();
    const colors = post({type:'getColors'}).then( result => result.data );
    const tags = post({type:'getTags'}).then( result => result.data );

    Promise.all([colors, tags]).then( result => setTagBox([
      {header: 'Movies aesthetics', tags:result[1], type:'tag'},
      {header: 'Shots hues', tags: result[0], type:'colour'}
    ]));


    const colourResults = colourChain.length > 0 ? FetchAPI.post({type:'getShotsWithColours', colours:colourChain, tags:tagChain}).then(result => result.data) : new Promise(resolve => resolve([]));
    const tagResults = tagChain.length > 0 ? FetchAPI.post({type:'getMoviesFromTags', tags:tagChain}).then(result => result.data) : new Promise(resolve => resolve([]));

    Promise.all([tagResults, colourResults]).then( result => {

      setResults({
      tagChain:tagChain,
      colourChain:colourChain,
      tags: result[0],
      colours: result[1].shots,
      total: setTotalResult(colourChain, tagChain, result[0], result[1].movies)
    })
  });



  },[tagChain,colourChain]);

  return  (
    <>
        <div id="tag_container" className="settings_container">
            <Counter results={ results ? results : {} } titles={ results.tags ? spliceTitle(results.tags,7) : []}/>
            <div id="tagbox_wrapper">
            {  tagBox.map( item => <TagBox key={'tagbox_'+item.header} header={item.header} tags={item.tags} onChange={onChange} type={item.type}/>) }
            </div>
        </div>
    </>
    );
}

export default Tags;
