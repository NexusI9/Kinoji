//static
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SearchBar } from '../inputs';
import { useState, useEffect } from 'react';
import * as Routing from '@/lib/routing';
import SideMenu from './SideMenu';

import kinojilogo from '@/assets/logo.svg';
import minimlogo from '@/assets/logo-minimized.svg';

import { BurgerMenu, Panel } from './TopBar.children';
import { AnimatePresence } from 'framer-motion';


export default () => {

  const [ active, setActive ] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const location = router.pathname;

  useEffect(() => {
    const onMatchMedia = (e) => setMinimized(e.matches)
    const mediaQuery = window.matchMedia('(max-width:800px)');
    mediaQuery.addEventListener('change',onMatchMedia);

    onMatchMedia(mediaQuery);

    return () => mediaQuery.removeEventListener('change',onMatchMedia);
  },[]);

  useEffect(() => {

      const onScroll = () => {
        if(open){ return; }
        if(window.pageYOffset > window.innerHeight){ setActive(true); }
        else{ setActive(false); }
      }

      if( Routing.isSettings(location) ){ setActive(true); }
      else if(Routing.isHomepage(location) ){  setActive(false); document.addEventListener('scroll', onScroll); }
      else{
         setActive(true);
         document.removeEventListener('scroll', onScroll);
       }

      return () => {
        document.removeEventListener('scroll', onScroll);
      }

  },[location]);

  useEffect(() => { setActive(true) },[open]);

  return(
        <nav id="topMenu" className={`${active ? '' : 'inactive'} ${Routing.isSettings(location) ? 'transparent' : '' } ${open ? 'open' : ''}` }>
            <div id='kinoIco'>
              <Link href='/'>
              <picture>
                <source srcset={minimlogo.src} media="(max-width: 800px)" />
                <img src={kinojilogo.src} />
              </picture>
                </Link>
              <Link href='/movies'>movies</Link>
              <Link href='/collections'>collections</Link>
            </div>
            <div id='toolsBar'>
                <SearchBar />
            </div>
            {minimized ? <BurgerMenu onClick={e => setOpen(e)}/>  : <SideMenu />}
            <AnimatePresence mode='wait'>
              {open && <Panel/> }
            </AnimatePresence>
        </nav>
  );

}
