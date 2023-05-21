import { useState, useEffect } from 'react';
import { Poster } from '../movieobject';
import useAPI from '../../lib/api';

const SubMovies = ({id}) => {

    const [ movies, setMovies ] = useState();
    useEffect( () => {
      const { post } = useAPI();
      post({type:'getMoviesFromDir', id:id} ).then( result => { console.log(result.data); setMovies(result.data) })
    }, [id]);
  
    return(
      <>
      {
        movies ?
        <>
          <h3>Movies</h3>
          <hr/>
          <div id='dirmovies'>{ movies.map( mv => <Poster key={'dirmovie_'+mv.id} movie={mv} size='small' /> ) }</div>
        </> : <></>
      }
      </>
    );
  }

  export default SubMovies;