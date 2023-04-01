import FetchAPI from '../lib/fetchapi';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Banner } from '../components/header';
import { Flow } from '../components/movieobject';

import { container } from '../lib/variants.js';
import { motion } from 'framer-motion';

function Director(){

  const { id } = useParams();
  const [ director, setDirector ] = useState([]);
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    FetchAPI.post({type:'getDirector', id:id}).then( result => {
      setDirector(result.data);
      document.title = 'KINO寺 - Director: '+ (result.data[0].name || '');
    });
    FetchAPI.post({type:'getMoviesFromDir', id:id}).then( result => setMovies(result.data) );
  }, [id]);


return(
  <div className='container'>
  {
    director.map( infos =>
      <Banner
        key={'director_banner_'+infos.id}
        visual={<img alt={'poster_banner_'+infos.name} src={infos.poster || require('../assets/noposter.jpg') } /> }
        category={'director'}
        header={infos.name}
        summary={infos.summary}
        sources={infos.source}
        spheros={true}
      />
    )
  }
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      className='movie_wrapper'
      style={{marginTop:'5%'}}
      >
    <Flow movies={movies} />
    </motion.div>
  </div>
  );
}

export default Director;
