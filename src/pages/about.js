import { container } from '@/lib/variants.js';
import { motion } from 'framer-motion';
import {useEffect} from 'react';


const About = (props) => {

  useEffect(() => {
    document.title = 'KINO寺 - About';
  },[]);

  return(
    <motion.div
      variants={ container }
      initial='initial'
      animate='animate'
      exit='exit'
     className='casual_content'>
      <h1>About Kinoji</h1>

      <p>Kinoji is an online cinematography library focused on Asia and author cinema. The movies were simply chosen because I found their cinematography successful or inspiring</p>
      <p>You may find in this selection a lot of Asians or SF movies, two genres in which I find great inspirations, for many reasons...</p>
      <p>The list has been done without any pretention, I do not consider myself as a Cinephile. Thus, there are a lot of chance you won't find the <i>Grands crus</i> of cinema history. Those are just movies that had an emotional impact on me or that I found had a clear cinematography or art direction quality.</p>
      <br />
      <br />
      <p>This webapp was made for educational purpose.</p>
      <p>I do not own any of the visual contents. Credits to all the talentuous cinematrogaphers out there. </p>
      <p>More about my work at <a className='link underline' target='_blank' href="https://www.elkhantour.com/">www.elkhantour.com</a></p>
    </motion.div>

  );
}

export default About;
