
import React, { useEffect }  from 'react';
import { motion } from 'framer-motion';
import { container } from '@/lib/variants.js';
import { ShotSlider } from '@/components/movieobject';
import { HomeHeader, LatestMovies, ListSelection, AboutKinoji, Highlights } from '@/components/home';


export default function Home(props){

  useEffect( () => {
    document.title = "KINO寺 - The portal to author and asia cinema";
  },[]);

  return(<>

        <motion.main
            variants={container}
            initial='initial'
            animate='animate'
            exit='exit'
        >
            <HomeHeader />
            <LatestMovies number={7} />
            <ListSelection />
            <ShotSlider/>
            <Highlights/>
            <AboutKinoji />
        </motion.main>
  </>

);
}


