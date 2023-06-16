import noposter from '@/assets/noposter.jpg';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

export default ({people, delay=0}) => (
    <MotionLink 
        className='poster people-poster' 
        href={`/director/${people.id}`}
        key={people.id}
        initial={{opacity:0, x:-10}}
        animate={{opacity:1, x:0, transition:{duration:0.2,delay:delay}}}
        exit={{opacity:0, x:20, transition:{duration:0.2, delay:delay}}}
        >
        <img src={people.poster || noposter.src} alt={`${people.name} portrait`}/>
        <span></span>
        <p><small>{people.name}</small></p>
    </MotionLink>
);