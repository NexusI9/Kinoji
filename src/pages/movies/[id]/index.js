import { Bundle, Flow } from '@/components/movieobject';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import useAPI from '@/lib/api';

import { container } from '@/lib/variants.js';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';


function Movie(){
 
  const router = useRouter();
  const {id} = router.query;

  const [movie, setMovie] = useState();

  useEffect(() => {

      const {post} = useAPI();

      if(id){
        post({type:'getMovieFromId',id:id}).then( res => setMovie(res.data) );
      }

  }, [id]);

  return(
    <AnimatePresence mode='wait'>
      <Head>
        <title>{ (movie && movie[0] && movie[0].title) || 'movie' } on Kinoji</title>
      </Head>
      <motion.div
        variants={container}
        initial='initial'
        animate='animate'
        exit='exit'
        id='movie_solo_page_wrapper'
        className='container'
        key={'container_movie_'+id}
        >
          { movie &&  <div>
            {
            movie.map( item => 
                <Bundle 
                  key={'movieposter_'+item.id} 
                  movie={item} 
                  summary={true} 
                  linked={false} 
                  spheros={true}/>
                  )}
            </div> }
      </motion.div>
    </AnimatePresence>
  );

}


export default Movie;
