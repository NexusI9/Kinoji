//Movie Objects
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { XMasonry, XBlock } from 'react-xmasonry';
import { getMovieYear } from '../../lib/utilities.js';
import { LabelBar } from '../header';
import { MovieSettings } from '../inputs';
import Poster from './Poster.js';
import Bundle from './Bundle.js';
import { AnimatePresence, motion } from 'framer-motion';
import { movie_container } from '@/lib/variants';

const Flow = ({ movies }) => {

  const step = 4;
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
  const [ mosaic, setMosaic ] = useState( mosaicParam == 1 ? true : false);      //boolean
  const [ sort, setSort ] = useState('name');         //string
  const [ content, setContent ] = useState();         //react symbols


  useEffect(() => {

    const masonryArray = [];

    //elements
    const poster = (mvl) => mvl.map( movie => <Poster key={'poster_'+movie.id} movie={movie} />);
    const mosa = (mvl) => mvl.map( movie => <Bundle key={'bundle'+movie.id} movie={movie} masonry={ movies.length > 1 } />);
    const mason = (ar) => ar.map(item => <XBlock key={'xblock'+item.key}>{item}</XBlock>);

    //infinit scroll
    let cursor = 0;
    const split = (array) => {
      const old_cursor = cursor;
      cursor += step;
      return array.slice(old_cursor, cursor);
    }
    const onScroll = () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight-1 ) {
        masonryArray.push(...split(movies));
        setContent( displayMode(masonryArray) );
      }
    }

    //utilities
    const sortBy = (filter, mvl) => {

      switch(filter){

        case 'year':
          return [...mvl.sort( (a,b) => getMovieYear(a) - getMovieYear(b) ) ];
        break;

        case 'name':

        default:
          return [...mvl.sort( (a,b) => {
            if(a.title[0] < b.title[0]){ return -1; }
            if(a.title[0] > b.title[0]){ return 1; }
            return 0;
          })];

      }
    }

    const displayMode = (mvl) => {

      window.removeEventListener('scroll', onScroll);
      if (mvl.length === 1){ return( <>{mosa(mvl)}</> ); } //solo movie
      if ( !mosaic ){return ( <>{ poster(mvl) }</> ); }  // poster mode
      else{
        window.addEventListener('scroll', onScroll);

        if( cursor === 0 ){ masonryArray.push(...split(mvl)); }
        return (
          <XMasonry key='xmasonry-movies' maxColumns={2} center={false} responsive={false} targetBlockWidth={window.innerWidth/2} >
            { mason(mosa(masonryArray)) }
          </XMasonry>
        );
      }// masonry mode
    }

    movies = sortBy(sort, movies);
    setContent( displayMode(movies) );

    return () => window.removeEventListener('scroll', onScroll);

  },[movies, mosaic, sort])



  return(
    <>
      <LabelBar hero={false} sticky={true} label= {<>Movies<span className='light'> ({movies.length})</span> </>} hyperlink={ movies.length > 1 ? <MovieSettings onChange={onChange} mosaic={mosaic} defaultCheck={sort} /> : <></> } />
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
        </motion.div>
      </AnimatePresence>
    </>
  )

}

export default Flow;
