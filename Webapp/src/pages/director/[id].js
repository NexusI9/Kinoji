import useAPI from '@/lib/api';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { Banner } from '@/components/header';
import { Flow } from '@/components/movie';

import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';

import noposter from '@/assets/noposter.jpg';
import Head from 'next/head';

function Director(props){

return(
  <div className='container'>
    <Head>
      <title>{ props.director[0].name } on Kinoji</title>
    </Head>
  {
    props.director.map( infos => <Banner
        key={'director_banner_'+infos.id}
        visual={<img alt={'poster_banner_'+infos.name} src={infos.poster || noposter.src } /> }
        category={'director'}
        header={infos.name}
        summary={infos.summary || ''}
        sources={infos.source}
        spheros={true}
      />)
  }
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      style={{marginTop:'5%'}}
    >
    <Flow movies={ props.movies } />
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
  const director = await useAPI().fetch({type:'getDirectorFromId', id:params.id});
  const dirMovies = await useAPI().fetch({type:'getMoviesFromDir', id:params.id});
  console.log(director);
  return {
    props: {
      director:director,
      movies:dirMovies
    } // Passed to the page component as props
  }
}