//Movie Objects
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { LabelBar } from '../header';
import { MovieSettings } from '../inputs';
import { AnimatePresence, motion } from 'framer-motion';
import { movie_container } from '@/lib/variants';
import { sortBy, generateContent } from './Flow.helper';

const Flow = ({ movies }) => {


  const router = useRouter();
  const mosaicParam = router.query.mosaic;
  //events
  const onChange = (e) => {
    switch(e.type){
      case 'switch':
        setMosaic(e.value);
      break;

      case 'radio':
        setSort(e.value);
      break;

      default:
    }
  }


  //movie list
  const [ mosaic, setMosaic ] = useState( mosaicParam == 1 );      //boolean
  const [ sort, setSort ] = useState('name');         //string
  const [ content, setContent ] = useState();         //react symbols
  const [load, setLoad] = useState(false); 


  const onScroll = () => {
    console.log('scroll');
    if ( ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight-1) ) {
      setLoad(true);
    }
  } 


  useEffect(() => {

    movies = sortBy(sort, movies); //sort all movies (by name or year release)
    if(movies.length){  setLoad(true);  } //init first load 

    console.log({mosaic});
    if(!mosaic){ window.removeEventListener('scroll', onScroll); }
    else{ window.addEventListener('scroll', onScroll); }

    return () => window.removeEventListener('scroll', onScroll);

  },[movies, mosaic, sort]);


  useEffect(() => {

    if(load){

      const newContent = generateContent({
        movie_list: movies,
        is_mosaic: mosaic, 
        onComplete: () => setLoad(false) 
      });
     
     if(newContent){ setContent(newContent); }

    }


  }, [load]);




  return(
    <>
      <LabelBar 
        hero={false} 
        sticky={true} 
        label= {<>Movies<span className='light'> ({movies.length})</span> </>} 
        hyperlink={ movies.length > 1 && <MovieSettings onChange={onChange} mosaic={mosaic} defaultCheck={sort} /> } />
      <AnimatePresence mode='wait'>
        <motion.div 
          className='movie_wrapper' 
          data-mode={ (movies.length === 1 || mosaic) ? 'default' : 'poster'}
          key={'container-movie'+mosaic+sort}
          variants={movie_container}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          { content }
          { mosaic && load && 
          <svg className='movie_wrapper_loader' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3672 9.63281C17.0174 9.63281 16.7344 9.3498 16.7344 9C16.7344 7.95586 16.5305 6.94336 16.1262 5.98887C15.7373 5.06999 15.1744 4.23494 14.4686 3.52969C13.7641 2.8229 12.9288 2.25991 12.0094 1.87207C11.0566 1.46953 10.0441 1.26562 9 1.26562C8.6502 1.26562 8.36719 0.982617 8.36719 0.632812C8.36719 0.283008 8.6502 0 9 0C10.2146 0 11.3941 0.237305 12.5033 0.708398C13.5756 1.16016 14.5371 1.81055 15.3633 2.63672C16.1895 3.46289 16.8381 4.42617 17.2916 5.49668C17.7609 6.60586 17.9982 7.78535 17.9982 9C18 9.3498 17.717 9.63281 17.3672 9.63281Z" fill="#E32424"/>
          </svg>
          }
        </motion.div>
      </AnimatePresence>
    </>
  )

}

export default Flow;
