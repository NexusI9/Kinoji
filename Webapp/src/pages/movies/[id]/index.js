import { Bundle } from '@/components/movie';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import useAPI from '@/lib/api';

import { container } from '@/lib/variants.js';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';


function Movie(props){
 
  const router = useRouter();
  const {id} = props || router.query;

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
        <title>{ (props.movie || movie)[0].title } on Kinoji</title>
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

          <div>
            {
            ( props.movie || movie ).map( item => 
                <Bundle 
                  key={'movieposter_'+item.id} 
                  movie={item} 
                  summary={true} 
                  linked={false} 
                  spheros={true}/>
              )}
          </div>
      </motion.div>
    </AnimatePresence>
  );

}


export default Movie;


// Generates `/movies/1` and `/movies/2`
export async function getStaticPaths() {
  const movies = await useAPI().fetch('getAllMovies');
  return {
    paths: movies.map( ({id}) => ({ params: { id: id.toString() } }) ),
    fallback: false, // can also be true or 'blocking'
  }
}
// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params}) {
  const movies = await useAPI().fetch('getAllMovies');
  const movie = movies.filter(mv => mv.id.toString() == params.id.toString());
  
  return {
    props: {movie:movie} // Passed to the page component as props
  }
}
