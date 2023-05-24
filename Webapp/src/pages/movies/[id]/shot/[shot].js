import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { image } from '@/lib/variants';
import { Header, Thumbnails } from '@/components/fullview';
import useAPI from '@/lib/api';
import Head from 'next/head';

export default function FullView(){

  const router = useRouter();
  const { id, shot } = router.query;

  const [movie, setMovie] = useState([]);


  useEffect(() => {

    if(id && shot){
      const {post} = useAPI();
      post({type:'getMovieFromId', id:id}).then(result => {
        setMovie(result.data);
      });
    }
    
  },[id, shot]);


  return (
    <>
      <Head>
        <title>KINOJI Viewer {(movie && movie[0] &&  ': '+movie[0].title)  }</title>
      </Head>
      {
        movie.map( mv =>
          <div key={mv.id} id='fullview'>
            <Header movie={mv} />
            <section id="fullFrame">
                <AnimatePresence mode='wait'>
                  <motion.img
                      key={shot}
                      variants={image}
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      alt='full frame'
                      id="main_frame"
                      src={"/assets/movies/"+mv.folder+"/"+shot+".webp"}
                  />
                </AnimatePresence>
            </section>
            <Thumbnails movie={mv} />
          </div>
        )
      }
    </>
  );

}
