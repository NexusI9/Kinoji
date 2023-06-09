//Movie Objects
import  { useState, useEffect, useRef } from 'react';
import { shuffle_array } from '../../lib/utilities.js';
import { motion } from 'framer-motion';
import { movie_container, mosaic } from '../../lib/variants.js';
import Thumbnail from './Thumbnail.js';


const Mosaic = ({ movie, animate, random=false, limit, onThumbsLoaded=()=>0 }) => {

  const [ pics, setPics ] = useState(movie.shots.split(';'));
  const loadedPics = useRef(0);

  useEffect(() => {

    let shot_list = movie.shots.split(';');

    // sort them (name/year/random)
    if(!random){ setPics(shot_list); }
    else{ setPics(shuffle_array(shot_list)); }

    return () => shot_list = [];
    

  }, [random, movie]);

  /*useEffect(() => {
    if(pics?.length && loadedPics.current === pics.length){  onThumbsLoaded(); }
  }, [loadedPics.current, pics]);*/


  return(
     <motion.div
        id={movie.id}
        className='movie_thumbnails'
        key={'container'+movie.id}
        variants={movie_container}
        initial='initial'
        animate='animate'
        exit='exit'
        >
          {
            pics.length && pics.map( (pic,i) => {
              if(limit && i >= limit){ return; }
              return (
                <motion.div
                  key={pic}
                  variants={mosaic}
                >
                  <Thumbnail 
                    movie={movie} 
                    shot={pic} 
                    onLoad={ () => loadedPics.current++ }
                  />
                </motion.div> );
              }
            )
          }
        </motion.div>
  );
}

export default Mosaic;