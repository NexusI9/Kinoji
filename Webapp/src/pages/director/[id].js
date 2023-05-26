import useAPI from '@/lib/api';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { Banner } from '@/components/header';
import { Flow } from '@/components/movieobject';

import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';

import noposter from '@/assets/noposter.jpg';
import Head from 'next/head';

function Director(props){

  const router = useRouter();
  const { id } = props || router.query;
  const [ director, setDirector ] = useState([]);
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {

    if(id){

      const { post } = useAPI(); 
      post({type:'getDirector', id:id}).then( result => {
        setDirector(result.data);
        document.title = 'KINO寺 - Director: '+ (result.data[0].name || '');
      });
      post({type:'getMoviesFromDir', id:id}).then( result => setMovies(result.data) );

    }

  }, [id]);


return(
  <div className='container'>
    <Head>
      <title>Kinoji Director{(director && director[0] && ': '+director[0].name) }</title>
    </Head>
  {
    director.map( infos =>
      <Banner
        key={'director_banner_'+infos.id}
        visual={<img alt={'poster_banner_'+infos.name} src={infos.poster || noposter } /> }
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
      style={{marginTop:'5%'}}
      >
    <Flow movies={movies} />
    </motion.div>
  </div>
  );
}

export default Director;


// Generates `/movies/1` and `/movies/2`
export async function getStaticPaths() {
  const directors = await useAPI().fetch('getAllDirectors');
  return {
    paths: directors.map( ({id}) => ({ params: { id: id.toString() } }) ),
    fallback: false, // can also be true or 'blocking'
  }
}
// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({params}) {
  const directors = await useAPI().fetch('getAllDirectors');
  const dirID = directors.find(d => d.id.toString() == d.id.toString());

  return {
    props: {id:dirID} // Passed to the page component as props
  }
}