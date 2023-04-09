//Movie Objects
import  { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAPI from '../../lib/api';
import {
  sortThumbnails,
  shuffle_array,
  paramsToArray
} from '../../lib/utilities.js';
import { motion } from 'framer-motion';
import { movie_container, mosaic } from '../../lib/variants';
import Thumbnail from './Thumbnail';


const Mosaic = ({ movie, animate, random=false, limit }) => {

  const router = useRouter();
  let { colours } = router.query;
  const [ pics, setPics ] = useState([]);

  useEffect(() => {

    colours = paramsToArray(colours);
    let shot_list = [];

    //fetch filtered or all pics
    if(colours){
      const {post} = useAPI();
      shot_list = post({type:'getShotsWithColours',id:movie.id, colours:colours}).then( result => result.data.length > 0 ? result.data.map(shots => shots.shots) : movie.shots.split(';')  );
    }else{
      shot_list = new Promise( resolve => resolve( movie.shots.split(';') ) );
    }

    // sort them (name/year/random)
    shot_list.then( result => {
      if(!random){ setPics(sortThumbnails(result)); }
      else{ setPics(shuffle_array(result)); }
    });

    return () => shot_list = [];
    

  }, [colours, random, movie]);


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