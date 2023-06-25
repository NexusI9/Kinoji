//static
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SearchBar } from '../inputs';
import { useState, useEffect } from 'react';
import * as Routing from '@/lib/routing';
import SideMenu from './SideMenu';

import kinojilogo from '@/assets/logo.svg';
import minimlogo from '@/assets/logo-minimized.svg';


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
  return(
        <nav id="topMenu" className={(active ? '' : 'inactive') +' '+(Routing.isSettings(location) ? 'transparent' : '' ) }>
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
            {minimized ? 
            <div className={`burger-menu ${open ? 'active' : ''}`} onClick={ () => setOpen(!open)}>
                <div className='list'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className='cross'>
                  <span></span>
                  <span></span>
                </div>
            </div> :
             <SideMenu />
            }
        </nav>
  );

}
