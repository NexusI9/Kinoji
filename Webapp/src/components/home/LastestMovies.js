
import React, { useEffect, useState }  from 'react';
import { Cta } from '../inputs';
import { Poster } from '../movieobject';
import { LabelBar } from '../header';
import useAPI from '../../lib/api';

const LatestMovies = ({ number }) => {

    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
      const {post} = useAPI();
      post({type:'getLatestMovies', limit: number} ).then( res => setMovies(res.data) );
    },[number]);
  
  
    return(
      <div id='latest' className='container'>
        <LabelBar 
          label='New on Kinoji' 
          hyperlink= { <Cta to='/movies' type='secondary'>See all movies</Cta> } 
          underline={false}
          />
        <section>
          { movies.map( movie => <Poster key={'poster_'+movie.id} movie={movie}/> ) }
        </section>
      </div>
    );
  
  }

  export default LatestMovies;