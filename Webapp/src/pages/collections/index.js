import { useState, useEffect } from 'react';
import { Rubrique } from '@/components/movie';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { PageHeader } from '@/components/static';

export default function Collections(){

  const [ genres, setGenres ] = useState([]);

  useEffect( () => {

    const {post} = useAPI();
    post({type:'GET_COLLECTION',genre:''}).then( ({data}) =>  setGenres(data) );

  },[]);


  return( 
    <>
      <Head>
        <title>Collections | Kinoji</title>
      </Head>
      <PageHeader headline='Collections library' description='Browse and discover movies through various collections gathering productions depending on their art movement, historical periods, aesthetics or political commitments.' />
      <motion.div
        variants={container}
        initial='initial'
        animate='animate'
        exit='exit'
        key='all-rubriques_container'
        className='container'
      >
        <div className='padded all-rubriques'>
        {genres.map( gr => <Rubrique key={gr.name} genre={gr} />)}
        </div> 
      </motion.div> 
    </>
    );
}

