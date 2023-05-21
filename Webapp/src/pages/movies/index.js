import { Bundle, Flow } from '@/components/movieobject';
import { useEffect, useState } from 'react';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { PageHeader } from '@/components/static';


export default function Movies(){

  const [content, setContent] = useState();
  useEffect(() => {
      const {post} = useAPI();
      post({type:'getAllMovies'}).then( res => {
        setContent(<Flow movies={res.data} />);
      });

  }, []);

  return(
    <>
      <Head>
        <title>KINOJI movies library</title>
      </Head>
      <PageHeader headline='Movies library' description='Welcome to the movie library, browse Kinoji’s countless international movies. You can class them by name or release date. You can also switch the display mode using the settings bar below.' />
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
      </>
  );

}

