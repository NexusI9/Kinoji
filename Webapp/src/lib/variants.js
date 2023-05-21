/*
Framer motion animations
*/

import { motion } from 'framer-motion';

export const container = {
  initial: { opacity:0 },
  animate:{ opacity:1, transition: {duration: 0.3} },
  exit:{ opacity:0, transition: {duration: 0.3} }
};

export const movie_container = {
  initial: { opacity:0 },
  animate:{ opacity:1, transition: {duration: 0.3, staggerChildren:0.03} },
  exit:{ opacity:0, transition: {duration: 0.3} }
}


export const mosaic = {
  initial: { opacity:0 },
  animate:{ opacity:1, transition: {duration: 0.3} },
  exit:{ opacity:0, transition: {duration: 0.3} }
};

export const settings = {
  initial: { y: '-100%'},
  animate: { y: '0', transition: {duration: 0.7 } },
  exit:    { opacity: '0', transition: {duration: 0.7} },
};

export const image = {
  initial: { opacity:0 },
  animate: { opacity:1, transition: {duration: 0.2 } },
  exit: { opacity:0 },
}
