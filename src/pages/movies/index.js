import { Bundle, Flow } from '@/components/movieobject';
import { useEffect, useState } from 'react';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { motion, AnimatePresence } from 'framer-motion';


export default function Movies(){

  const [content, setContent] = useState();
  useEffect(() => {
      const {post} = useAPI();
      post({type:'getAllMovies'}).then( res => {
        document.title = "KINO寺 - All movies";
        setContent(<Flow movies={res.data} />);
      });

  }, []);

  return(
    <AnimatePresence mode='wait'>
      <motion.div
        variants={container}
        initial='initial'
        animate='animate'
        exit='exit'
        id='movie_page_wrapper'
        className='container'
        key={'container_movies'}
        >
          { content && content }
      </motion.div>
    </AnimatePresence>
  );

}

