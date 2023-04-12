import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import Head from 'next/head';


const About = (props) => {

  return(
    <motion.div
      variants={ container }
      initial='initial'
      animate='animate'
      exit='exit'
     className='casual_content'>
      <Head>
        <title>About KINOJI</title>
      </Head>
      <h1>About Kinoji</h1>

      <p>
        Kinoji is an online cinematography library that focuses on Asian and author cinema.
        The website serves as a search engine and gathering place for movie enthusiasts and artists who are looking for inspiration or hoping to increase their knowledge about Asian cinema. With a mission to educate and inform, Kinoji provides a comprehensive database of movies and directors, making it easy for users to discover new films and expand their cinematic horizons.
      </p>
      <p>More about my work at <a className='link underline' target='_blank' href="https://www.elkhantour.com/">www.elkhantour.com</a></p>
    </motion.div>

  );
}

export default About;
