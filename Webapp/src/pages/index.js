
import React, { useEffect }  from 'react';
import { motion } from 'framer-motion';
import { container } from '@/lib/variants.js';
import { HomeHeader, LatestMovies, ListSelection, AboutKinoji, Highlights, Amount, Newsletter } from '@/components/home';
import Head from 'next/head';


export default function Home(props){


  return(<>
        <Head>
          <title>KINOJI: Your Asian Cinema visual library</title>
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
            <Amount />
            <Highlights/>
            <Newsletter/>
            <AboutKinoji main={false}/>
        </motion.main>
  </>

);
}


