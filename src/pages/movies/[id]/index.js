import { Bundle, Flow } from '@/components/movieobject';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import useAPI from '@/lib/api';

import { container } from '@/lib/variants.js';
import { motion, AnimatePresence } from 'framer-motion';


function Movie(){
 
  const router = useRouter();
  const {id} = router.query;

  const [content, setContent] = useState();
  useEffect(() => {
      const {post} = useAPI();
      switch(id){
          case undefined:
            post({type:'getAllMovies'}).then( res => {
              document.title = "KINO寺 - All movies";
              setContent(<Flow movies={res.data} />);
            });
          break;

          default:
            post({type:'getMovieFromId',id:id}).then( res => {
              document.title = `${ (res.data[0].title || '') } on KINOJI`;
              setContent( <div>{res.data.map( item => <Bundle key={'movieposter_'+item.id} movie={item} summary={true} linked={false} spheros={true}/> )}</div> );
            }) ;
      }

  }, [id]);

  return(
    <AnimatePresence mode='wait'>
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
