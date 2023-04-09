//static
import { useRouter } from 'next/router';
import Link from 'next/link';
import kinojilogo from '../../assets/logo.svg';
import { SearchBar } from '../inputs';
import { useState, useEffect } from 'react';
import * as Routing from '../../lib/routing';
import SideMenu from './SideMenu';


const TopBar = () => {

  const [ active, setActive ] = useState(true);
  const router = useRouter();
  const location = router.pathname;

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
              <Link href='/'><img style={{width:'100%', maxHeight:'100%'}} src={kinojilogo.src} /></Link>
              <Link href='/movies'>movies</Link>
              <Link href='/collections'>collections</Link>
            </div>
            <div id='toolsBar'>
                <SearchBar />
            </div>
            <SideMenu />
        </nav>
  );

}

export default TopBar;