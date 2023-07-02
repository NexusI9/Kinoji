import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { AboutKinoji, Amount } from '@/components/home';



const About = () => {

  return (
    <>
      <motion.div
        variants={container}
        initial='initial'
        animate='animate'
        exit='exit'
        className='page-about casual_content'>
        <Head>
          <title>About KINOJI</title>
        </Head>
        <AboutKinoji />
        <h2>Kinoji it's...</h2>
      </motion.div>
      <Amount />
    </>
  );
}

export default About;
