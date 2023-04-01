import { container } from '../lib/variants.js';
import { motion } from 'framer-motion';
import {useEffect} from 'react';

const Contact = (props) => {
  useEffect(() => {
    document.title = 'KINO寺 - Contact';
  },[]);
  return(
    <>
        <h1>Contact</h1>
    </>

  );
}

export default Contact;
