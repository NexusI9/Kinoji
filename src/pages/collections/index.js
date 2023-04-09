import { useState, useEffect } from 'react';
import { LabelBar } from '@/components/header';
import { Rubrique } from '@/components/movieobject';
import useAPI from '@/lib/api';
import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';

export default function Collections(){

  const [ genres, setGenres ] = useState([]);

  useEffect( () => {

    const {post} = useAPI();
    document.title = 'KINO寺 Collections';
    post({type:'getGenre',genre:''}).then( ({data}) =>  setGenres(data) );

  },[]);


  return( 
    <motion.div
      variants={container}
      initial='initial'
      animate='animate'
      exit='exit'
      key='all_rubriques_container'
      className='container'
    >
      <LabelBar label='All genres' />
      <div className='padded' id='all_rubriques'>
      {genres.map( gr => <Rubrique key={gr.name} genre={gr} />)}
      </div> 
    </motion.div> );
}

