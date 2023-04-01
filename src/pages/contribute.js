import { container } from '../lib/variants.js';
import { motion } from 'framer-motion';
import {useEffect} from 'react';

const Contribute = (props) => {
  useEffect(() => {
    document.title = 'KINO寺 - Contribute';
  },[]);

  return(
    <>
        <h1>Contribute</h1>
    </>

  );
}

export default Contribute;
