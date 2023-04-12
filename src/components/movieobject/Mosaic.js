//Movie Objects
import  { useState, useEffect } from 'react';
import {
  sortThumbnails,
  shuffle_array,
} from '../../lib/utilities.js';
import { motion } from 'framer-motion';
import { movie_container, mosaic } from '../../lib/variants';
import Thumbnail from './Thumbnail';


const Mosaic = ({ movie, animate, random=false, limit }) => {

  const [ pics, setPics ] = useState([]);

  useEffect(() => {

    let shot_list = movie.shots.split(';');

    // sort them (name/year/random)
    if(!random){ setPics(sortThumbnails(shot_list)); }
    else{ setPics(shuffle_array(shot_list)); }

    return () => shot_list = [];
    

  }, [random, movie]);


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
            pics.length > 0 && pics.map( (pic,i) => {
              if(limit && i >= limit){ return; }
              return (
                <motion.div
                  key={pic}
                  variants={mosaic}
                >
                  <Thumbnail movie={movie} shot={pic} />
                </motion.div> );
              }
            )
          }
        </motion.div>
  );
}

export default Mosaic;