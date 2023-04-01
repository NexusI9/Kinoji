import { Bundle, Flow } from '../components/movieobject';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import FetchAPI from '../lib/fetchapi';

import { container } from '../lib/variants.js';
import { motion, AnimatePresence } from 'framer-motion';


function Movie(){

  const {id} = useParams();
  const [content, setContent] = useState();
  useEffect(() => {

      switch(id){
          case undefined:
            FetchAPI.post({type:'getAllMovies'}).then( res => {
              document.title = "KINO寺 - All movies";
              setContent(<Flow movies={res.data} />);
            });
          break;

          default:
            FetchAPI.post({type:'getMovieFromId',id:id}).then( res => {
              document.title = `${ (res.data[0].title || '') } on KINOJI`;
              setContent( <div>{res.data.map( item => <Bundle key={'movieposter_'+item.id} movie={item} summary={true} linked={false} spheros={true}/> )}</div> );
            }) ;
      }

  }, [id]);

  return(
    <AnimatePresence exitBeforeEnter>
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      id='movie_page_wrapper'
      className='container'
      key={'container_movie_'+id}
      >
      { content && content }
    </motion.div>
    </AnimatePresence>
  );

}


export default Movie;
