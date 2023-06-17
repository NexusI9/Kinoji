
import React, { useEffect, useState }  from 'react';
import { Cta } from '../inputs';
import { Poster } from '../movie';
import { LabelBar } from '../header';
import useAPI from '../../lib/api';

export default ({ number }) => {

    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
      const {post} = useAPI();
      
      post({type:'getLatestMovies', limit: number} ).then( res => setMovies(res.data) );

    },[number]);
  
  
    return(
      <section id='latest' className='container'>
        <LabelBar 
          label='New on Kinoji' 
          hyperlink= { <Cta href='/movies' type='secondary'>See all movies</Cta> } 
          underline={false}
          />
        <div>
          { movies.map( movie => <Poster key={'poster_'+movie.id} movie={movie}/> ) }
        </div>
      </section>
    );
  
  }