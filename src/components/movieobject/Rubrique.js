import { useState, useEffect } from 'react';
import FetchAPI from '../../lib/fetchapi';
import { firstSentenceOf } from '../../lib/utilities.js';
import { ArrowLabel } from '../inputs';
import Poster from './Poster';


const Rubrique = ({ genre, direction='vertical' }) => {

  const [movies, setMovies] = useState([]);

  useEffect(() =>{
    FetchAPI.post({type:'getMoviesFromGenre', genre:genre.name, limit: "6"}).then(result => { return setMovies(result.data); });
  },[genre]);

  return(
      <div className={'rubrique '+ direction}>
      <section className='shelf'>
            { movies.map( movie => <Poster key={'rubrique_poster_'+movie.id} movie={movie} size='small'/> ) }
      </section>
      <div className='content'>
        <section className='description'>
          <section className='header'><h4>{genre.name}</h4></section>
          <p>{firstSentenceOf(genre.summary)}</p>
        </section>
          <ArrowLabel link={`/collections/${genre.name}`} label='more' />
      </div>
    </div>
  );
}

export default Rubrique;