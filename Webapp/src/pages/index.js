
import React, { useEffect }  from 'react';
import { motion } from 'framer-motion';
import { container } from '@/lib/variants.js';
import { ShotSlider } from '@/components/movieobject';
import { HomeHeader, LatestMovies, ListSelection, AboutKinoji, Highlights } from '@/components/home';
import Head from 'next/head';


export default function Home(props){


  return(<>
        <Head>
          <title>KINOJI: The portal to author and asia cinema</title>
        </Head>
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

