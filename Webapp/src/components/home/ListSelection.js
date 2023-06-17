
import React, { useEffect, useState }  from 'react';
import { Cta } from '../inputs';
import { Rubrique } from '../movie';
import { LabelBar } from '../header';
import useAPI from '../../lib/api';
import { shuffle_array } from '../../lib/utilities';

export default () => {

    const [ genres, setGenres ] = useState([]);
    useEffect( () => {
      const api = useAPI();
      api.post({type:'getGenre', genre:''}).then( result => setGenres(result.data));
    }, []);
  
    return(
      <section className='container'>
        <LabelBar 
          label='Collections' 
          hyperlink= { <Cta href='/collections' type='secondary'>See all collections</Cta> } 
          underline={false}
          />
        <div id='rubrique_container'>
          { shuffle_array(genres).slice(0,4).map( (genre,i) => <Rubrique key={'rubrique_'+i} genre={genre} /> ) }
        </div>
      </section>
    );
  }