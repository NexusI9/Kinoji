//static

import { Link, useLocation } from 'react-router-dom';
import kinojilogo from '../../assets/logo.svg';
import { SearchBar } from '../inputs';
import { useState, useEffect } from 'react';
import * as Routing from '../../lib/routing';
import SideMenu from './SideMenu';


const TopBar = () => {

  const [ active, setActive ] = useState(true);
  const location = useLocation();

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
              <Link to='/'><img style={{width:'100%', maxHeight:'100%'}} src={kinojilogo} /></Link>
              <Link to='/movies'>movies</Link>
              <Link to='/collections'>collections</Link>
            </div>
            <div id='toolsBar'>
                <SearchBar />
            </div>
            <SideMenu />
        </nav>
  );

}

export default TopBar;